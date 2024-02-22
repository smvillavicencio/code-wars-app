// ADD YOUR FILE EXPORTS HERE

let io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:5173", process.env.UI_URL || "", "http://mingle-with.me/", "https://mingle-with.me/", "http://www.mingle-with.me/", "https://www.mingle-with.me/", "mingle-with.me/", "www.mingle-with.me/", process.env.VERCEL_URL || ""],
  }
});

io.on("connection", (socket) => {
  //ADD SOCKET EVENTS HERE
});