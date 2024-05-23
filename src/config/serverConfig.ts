// src/config/serverConfig.ts
import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { handleIncomingMessage } from '../handlers/messageHandler';
import { authenticate } from '../handlers/auth';
import { log } from '../utils/logger';
import { retrieveMessages } from '../services/storageService';

export interface ServerConfig {
  port: number;
  messageFormat: 'json' | 'string' | 'binary';
  binaryCallback?: (message: Buffer) => any;
}

export const createWebSocketServer = (server: Server, config: ServerConfig): WebSocketServer => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws: WebSocket, req) => {
    if (!authenticate(req)) {
      log('Authentication failed');
      ws.close();
      return;
    }

    log('New client connected');
    ws.on('message', (message: Buffer) => {
      handleIncomingMessage(message, ws, wss, config.messageFormat, config.binaryCallback);
    });
    ws.on('close', () => {
      log('Client disconnected');
    });

    // Send stored messages for relevant events to the newly connected client
    const storedMessages = await retrieveMessages('someEvent'); // Replace 'someEvent' with actual event
    storedMessages.forEach((msg) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(msg));
      }
    });
  });

  return wss;
};
