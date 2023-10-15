import OBSWebSocket from "obs-websocket-js";
const obs = new OBSWebSocket();
import express from "express";
import { engine } from "express-handlebars";
import WebSocket from "ws";
import dotenv from "dotenv";

//made by @erms1337

const obsUrl = `ws://127.0.0.1:${process.env.OBS_PORT}`;
const protocols =  { protocols: "obs-websocket" };

try {
  dotenv.config();
  const app = express();
  const wss = new WebSocket.Server({
    port: 8080,
  });

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", "./views");

  app.get("/", async (req, res) => {
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
      obsUrl,
      process.env.OBS_PASSWORD,
      protocols
    );

    console.log(
      `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
    );

    const firstScreenshot = await obs.call("GetSourceScreenshot", {
      sourceName: "scene",
      imageFormat: "jpeg",
    });

    wss.on("connection", function connection(ws) {
      ws.on("message", async function incoming(d) {
        const { imageData } = await obs.call("GetSourceScreenshot", {
          sourceName: "scene",
          imageFormat: "jpeg",
        });
        ws.send(JSON.stringify({ imageEncoded: imageData }));
      });
    });

    res.render("home", {
      title: "Obs Preview Broadcast",
      imageEncoded: firstScreenshot.imageData,
    });
  });

  const PORT = process.env.PORT || 8989;
  app.listen(PORT, () => {
    console.log(
      `Server is listening on port ${PORT}: http://localhost:${PORT}`
    );
  });
} catch (error) {
  console.error("Failed to connect", error.code, error.message);
}
