import {  WebSocketServer, WebSocket } from 'ws';
import type { WebSocket as WSWebSocket } from 'ws';
import { parseMessage } from './parser';
import { getEvent, shouldStoreEvent } from '../services/eventRegistry';
import { storeMessage } from '../services/storageService';
import { log } from '../utils/logger';

export const handleIncomingMessage = (
  message: Buffer,
  ws: WSWebSocket,
  wss: WebSocketServer,
  format: 'json' | 'string' | 'binary',
  binaryCallback?: (message: Buffer) => any
): void => {
  const decodedMessage = parseMessage(message, format, binaryCallback);
  log(`Received message: ${decodedMessage}`);

  // Example: Assuming messages have an event type
  const event = decodedMessage.event;

  const eventConfig = getEvent(event);
  if (eventConfig) {
    eventConfig.callback(decodedMessage, ws);
    if (shouldStoreEvent(event)) {
      storeMessage(event, decodedMessage);
    }
  }

  // Broadcast the message to all clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
