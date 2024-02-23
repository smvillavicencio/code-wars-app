// ADD YOUR FILE EXPORTS HERE

let io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || "", process.env.DEV_FRONTEND_URL || "", process.env.PROD_FRONTEND_URL || ""],
  }
  // if ever there will be cors errors from the web-sockets, create .env files to store the frontend urls that you're using to connect to this socket server. (populate the FRONTEND_URL, DEV_FRONTEND_URL, PROD_FRONTEND_URL with the urls of the frontend that you're using.)
});

io.on("connection", (socket) => {
  //ADD SOCKET EVENTS HERE
  socket.on("buyBuff", (data) => {
    powerUp = data.powerUp
    userTeam = data.userTeam.user

    console.log(data)
    // insert backend function for applying buff

    console.log("Team " + userTeam + " has bought a buff.")

    // for toast notif
    socket.emit("newBuff", powerUp)
  })

  socket.on("applyDebuff", (data) => {
    powerUp = data.powerUp
    userTeam = data.userTeam.user
    recipientTeam = data.recipientTeam

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