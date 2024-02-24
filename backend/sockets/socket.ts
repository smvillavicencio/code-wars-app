// ADD YOUR FILE EXPORTS HERE
import { uploadSubmission } from './submissionSocket'

var roundStartTime: any;

let io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || "", process.env.DEV_FRONTEND_URL || "", process.env.PROD_FRONTEND_URL || ""],
  }
  // if ever there will be cors errors from the web-sockets, create .env files to store the frontend urls that you're using to connect to this socket server. (populate the FRONTEND_URL, DEV_FRONTEND_URL, PROD_FRONTEND_URL with the urls of the frontend that you're using.)
});

io.on("connection", (socket: any) => {
  //ADD SOCKET EVENTS HERE
  
  socket.on("newupload", (arg: any)=>{
    setTimeout( async ()=>{
      try {
        let response = await uploadSubmission(arg);
      
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

  socket.on("applyDebuff", (data: any) => {
    let powerUp = data.powerUp
    let userTeam = data.userTeam.user
    let recipientTeam = data.recipientTeam

    // insert backend function for applying debuff to chosen team
    
    // for toast notif
    // ilalagay to dun sa applying debuff to chosen team na functionality
    // settimeout ay for testing lang - iisang laptop ang userTeam and recipientTeam
    setTimeout(() => {
      socket.emit("newDebuff", powerUp)
    }, 20000)

    // lalabas to sa side ng userTeam
    console.log("Team " + userTeam + " has bought a debuff to be used against " + recipientTeam)
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