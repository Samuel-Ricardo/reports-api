import express, { Response } from "express";

const app = express();

//SSE Route

app.get("/events", (req, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // send events continuously
  const sendEvent = () => {
    const data = {
      message: "SSE Event",
      timestamp: Date.now(),
    };

    res.write(`id: ${Math.random()} \n`);
    res.write(`event: message \n`);
    res.write(`data: ${JSON.stringify(data)} \n\n`);
  };
});
