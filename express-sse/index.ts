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

  // send event every seconds
  const interval = setInterval(sendEvent, 1000);

  // close connection after 10 seconds
  setTimeout(() => {
    clearInterval(interval);

    res.write("event: close \n");
    res.write("data: Connection Closed \n\n");

    res.end();
  }, 10000);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
