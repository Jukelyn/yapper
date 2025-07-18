import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { WSMessage, ClientInfo } from "@/types/wschannel";
const server = createServer();
const wss = new WebSocketServer({ server });

const clientInfoMap = new Map<WebSocket, ClientInfo>();

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString()) as WSMessage;

    switch (msg.type) {
      case "join":
        clientInfoMap.set(socket, {
          channel: msg.channel,
          username: msg.username,
        });
        if (msg.channel != "" && msg.channel != null) {
          broadcastToChannel(msg.channel, {
            type: "system",
            body: `${msg.username} has joined the chat.`,
          });
        }
        break;

      case "leave":
        clientInfoMap.set(socket, {
          channel: msg.channel,
          username: msg.username,
        });

        if (msg.channel != "" && msg.channel != null) {
          broadcastToChannel(msg.channel, {
            type: "system",
            body: `${msg.username} has left the chat.`,
          });
        }

      case "message":
        broadcastToChannel(msg.channel, msg);
        break;
    }
  });

  socket.on("close", () => {
    const info = clientInfoMap.get(socket);
    if (info) {
      broadcastToChannel(info.channel, {
        type: "system",
        body: `${info.username} left the chat.`,
      });
      clientInfoMap.delete(socket);
    }
  });
});

function broadcastToChannel(channel: string, message: WSMessage) {
  wss.clients.forEach((client) => {
    const info = clientInfoMap.get(client);
    if (
      client.readyState === WebSocket.OPEN &&
      info &&
      info.channel === channel
    ) {
      client.send(JSON.stringify(message));
    }
  });
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running at ws://localhost:${PORT}`);
});
