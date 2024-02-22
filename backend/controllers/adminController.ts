import { Request, Response } from 'express';
import mongoose from 'mongoose';

var command = "normal";
var sendCommand = false;

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
        if (sendCommand) {
          res.write(`data: ${command}\n\n`);
          sendCommand = false;
        }
      }, 500);
    
      res.on("close", () => {
        clearInterval(interval);
        res.end();
      });
}

const setAdminCommand = (req: Request, res: Response) => {
    const newcommand = req.body.command;

    command = newcommand;
    sendCommand = true;
    return res.send();
}

export { commandChannel, setAdminCommand };