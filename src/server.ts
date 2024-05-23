import express from 'express';
import { createServer } from 'http';
import { createWebSocketServer } from './config/serverConfig';
import { registerEvent } from './services/eventRegistry';

const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);

const binaryHandler = (message: Buffer): any => {
  // Implement your binary message handling logic here
  return `Binary message length: ${message.length}`;
};

const config = {
  port: port as number,
  messageFormat: 'json' as 'json' | 'string' | 'binary',
  binaryCallback: binaryHandler
};

const wss = createWebSocketServer(server, config);

// Example of registering an event
registerEvent('exampleEvent', (message, ws) => {
  console.log(`Handling exampleEvent: ${message}`);
  // Implement your event-specific logic here
}, true); // 'true' means this event should be stored

server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
