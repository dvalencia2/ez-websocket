import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost', // Replace with your Redis server host
  port: 6379,        // Replace with your Redis server port
});

export default redis;
