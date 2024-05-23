import type { WebSocket as WSWebSocket } from 'ws';
type EventCallback = (message: any, ws: WSWebSocket) => void;

interface EventRegistry {
  [event: string]: {
    store: boolean;
    callback: EventCallback;
  };
}

const eventRegistry: EventRegistry = {};

export const registerEvent = (
  event: string,
  callback: EventCallback,
  store: boolean = false
): void => {
  eventRegistry[event] = { callback, store };
};

export const getEvent = (event: string) => {
  return eventRegistry[event];
};

export const shouldStoreEvent = (event: string): boolean => {
  return eventRegistry[event]?.store || false;
};
