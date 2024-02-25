// ADD YOUR FILE EXPORTS HERE
import TeamModel, { Team } from '../models/team';
import { uploadSubmission, checkSubmission } from './submissionSocket'

var roundStartTime: any;

let io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || "", process.env.DEV_FRONTEND_URL || "", process.env.PROD_FRONTEND_URL || ""],
  }
  // if ever there will be cors errors from the web-sockets, create .env files to store the frontend urls that you're using to connect to this socket server. (populate the FRONTEND_URL, DEV_FRONTEND_URL, PROD_FRONTEND_URL with the urls of the frontend that you're using.)
});

io.on("connection", (socket: any) => {
  //ADD SOCKET EVENTS HERE
  socket.on("join", (user:any) => {
    socket.join("user:" + user._id);
    console.log("joined user:" + user._id);
  });

  socket.on("newupload", (arg: any)=>{
    setTimeout( async ()=>{
      try {
        let response = await uploadSubmission(arg);
        console.log(response.submission)
        if (response.success) {
          console.log("||||||");
          socket.emit("newitemtojudge", response.submission);
        }
      } catch (error) {
        console.log(error);
      }
    }, 20000);

  });
  socket.on("buyBuff", (data: any) => {
    let powerUp = data.powerUp
    let userTeam = data.userTeam.user

    console.log(data)
    // insert backend function for applying buff

    console.log("Team " + userTeam + " has bought a buff.")

    // for toast notif
    socket.emit("newBuff", powerUp)
  })

  socket.on("applyDebuff", async (data: any) => {
    try{
      const powerUp = data.powerUp;
      const userTeam = data.userTeam;
      const recipientTeam = data.recipientTeam;

      // Check if recipient/target has the same debuff active
      if (
        recipientTeam.debuffs_received.some((debuff:any) => debuff._id == powerUp._id)
      ) {
        socket.emit("scenarioCheckerDebuff", 'existing');
      } else {
        const team : Team | null = await TeamModel.findById(userTeam._id);
        const tier_no = Object.keys(powerUp.tier)[0]; 
        
        if(team && team.score < powerUp.tier[tier_no].cost){
          socket.emit("scenarioCheckerDebuff", 'insufficient_funds');
        } else {
          socket.emit("scenarioCheckerDebuff", 'success');
          const startTime: Date = new Date();
          const endTime: Date = new Date(startTime.getTime() + powerUp.tier[tier_no].duration);
          
          // Adjust total points used and score accordingly
          await TeamModel.updateOne({ _id: userTeam._id }, { 
            $inc: { 
              score: -powerUp.tier[tier_no].cost, 
              total_points_used: powerUp.tier[tier_no].cost 
            }, 
            $push: { "activated_powerups": {
              _id: powerUp._id,
              name: powerUp.name,
              code: powerUp.code,
              type: powerUp.type,
              tier: tier_no,
              duration: powerUp.tier[tier_no].duration,
              cost: powerUp.tier[tier_no].cost,
              target: recipientTeam._id,
              startTime: startTime,
              endTime: endTime
            }}
          });
  
          //  apply debuffs_received and show toast if there is no immunity active
          if(!recipientTeam.active_buffs.find((buff: any) => buff.code === 'immune')){
            socket.to("user:" + recipientTeam._id).emit("newDebuff", powerUp);
            await TeamModel.updateOne({ _id: recipientTeam._id }, {
              $push: { "debuffs_received": {
                _id: powerUp._id,
                name: powerUp.name,
                code: powerUp.code,
                type: powerUp.type,
                tier: tier_no,
                duration: powerUp.tier[tier_no].duration,
                cost: powerUp.tier[tier_no].cost,
                from: recipientTeam._id,
                startTime: startTime,
                endTime: endTime
              }}
            });
          }
  
          console.log(
            userTeam.username +
              " has bought a debuff to be used against " +
              recipientTeam.team_name
          );
        }
      }
    } catch(err){
      console.log(err);
    }
  });

  // for judge evaluation
  // if evaluation values ay correct, error or incorrect:
      // emit("submitEval") ay galing sa client/src/pages/judges/submission-entries/EvalEditInputCell.jsx 
  
  // if evaluation value ay partially correct:
      // emit("submitEval") ay galing sa client/src/pages/judges/modals/EvaluationModal.jsx
  socket.on("submitEval", async (arg: any) => {
    try {
      let response = await checkSubmission(arg);

      if (response.success) {
        console.log(response.results)

        // table entries sa submission table should be reverse chronological, so unshift dapat yung method na gagamitin hindi push if magdadagdag ng new submission entry

        // update details sa db na need maupdate based sa nareceive na submission entry details from judge
        // update details din na dinidisplay sa view all problems page na table.
            // 'status' column depends on latest submission entry
            // 'score' column initially depends sa prev_max_score. once checked na yung latest submission entry, iccheck ulit if score > prev_max_score para sa 'score' column
        
        // need na may socket emit din siguro (?) na ipapasa yung evaluation value sa pages/judges/submission-entries/EvalViewInputCell
        // para maupdate yung displayed value since mahirap ipasa yung state na makukuha from EvalEditInputCell

        // check submission entry fields if score > prev_max_score.
            // if yes, then mag-emit ng "updateLeaderboard" para malaman ng client na updated yung overall team scores ng leaderboard
            // if no, then no need na mag-emit
      }

    } catch (error) {
      console.log(error);
    }
  })
});

const startRoundTimer = (seconds: number) => {
  console.log("Started round timer");
  roundStartTime = new Date().getTime();

  function getRemainingTime() {
    if (roundStartTime) {
      const elapsedTime = (new Date().getTime() - roundStartTime) / 1000;
      const remainingTime = Math.max(seconds - elapsedTime, 0);
      return { remainingTime: Math.round(remainingTime) };
    } else {
      return { remainingTime: 0 };
    }
  }

  io.emit('update', getRemainingTime());
  console.log(getRemainingTime());

  setInterval(() => {
    if (roundStartTime) {
      io.emit('update', getRemainingTime());
      console.log(getRemainingTime());
    }
  }, 1000);

  // Set a timeout to end the round after the specified duration
  setTimeout(() => {
    roundStartTime = null;
    io.emit('update', getRemainingTime());
    console.log(getRemainingTime());
  }, seconds * 1000);
}

export { startRoundTimer };
