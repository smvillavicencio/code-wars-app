// ADD YOUR FILE EXPORTS HERE
import TeamModel, { Team } from '../models/team';

let io = require("socket.io")(8000, {
  cors: {
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL || "",
      process.env.DEV_FRONTEND_URL || "",
      process.env.PROD_FRONTEND_URL || "",
    ],
  },
  // if ever there will be cors errors from the web-sockets, create .env files to store the frontend urls that you're using to connect to this socket server. (populate the FRONTEND_URL, DEV_FRONTEND_URL, PROD_FRONTEND_URL with the urls of the frontend that you're using.)
});

io.on("connection", (socket:any) => {
  //ADD SOCKET EVENTS HERE
  socket.on("join", (user:any) => {
    socket.join("user:" + user._id);
    console.log("joined user:" + user._id);
  });

  socket.on("buyBuff", (data:any) => {
    const powerUp = data.powerUp;
    const userTeam = data.userTeam;

    console.log(data);
    // insert backend function for applying buff

    console.log("Team " + userTeam + " has bought a buff.");

    // for toast notif
    socket.emit("newBuff", powerUp);
  });

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
});
