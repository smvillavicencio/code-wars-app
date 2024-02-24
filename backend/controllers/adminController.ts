import { Request, Response } from 'express';
import mongoose from 'mongoose';

var command = "normal";
var round = "easy";
var counter = 0;

const commandChannel = (req: Request, res: Response) => {
    console.log("Connected channel for admin commands.");
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
        "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
      });
      res.flushHeaders();
    
      const interval = setInterval(() => {
          res.write(`data: ${JSON.stringify({
            command,
            round
          })}\n\n`);

          if (command == "logout") {
            counter += 1;

            if (counter > 5) {
              command = "normal";
              counter = 0;
            }
          }
      }, 500);
    
      res.on("close", () => {
        clearInterval(interval);
        res.end();
      });
}

const setAdminCommand = (req: Request, res: Response) => {
    const newcommand = req.body.command;
    const newround = req.body.round;

    command = newcommand;
    round = newround;
    return res.send(
      { ok: true }
    );
}

export { commandChannel, setAdminCommand };