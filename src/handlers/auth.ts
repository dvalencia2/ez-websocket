// src/handlers/auth.ts
import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import { log } from '../utils/logger';

const secretKey = 'your_secret_key';

export const authenticate = (req: IncomingMessage): boolean => {
  const token = getTokenFromRequest(req);
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Authenticated user:', decoded);
    return true;
  } catch (err) {
    console.error('Authentication failed:', err);
    return false;
  }
};

const getTokenFromRequest = (req: IncomingMessage): string | null => {
  const authHeader = req.headers['sec-websocket-protocol'];
  return authHeader ? authHeader.toString() : null;
};
