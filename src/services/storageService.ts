import redis from '../config/redisConfig';
import { log } from '../utils/logger';

export const storeMessage = async (event: string, message: any): Promise<void> => {
  try {
    await redis.rpush(event, JSON.stringify(message));
    log(`Message stored in Redis under event "${event}"`);
  } catch (err) {
    log(`Error storing message in Redis: ${err}`);
  }
};

export const retrieveMessages = async (event: string): Promise<any[]> => {
  try {
    const messages = await redis.lrange(event, 0, -1);
    console.log(`Retrieved messages from Redis for event "${event}":`, messages);
    return messages;
  } catch (err) {
    log(`Error retrieving messages from Redis: ${err}`);
    return [];
  }
};
