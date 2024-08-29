import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from 'config';
import logger from './utils/logger';
import socket from './socket';

//Retrieving configurations from config
const port = config.get<number>('port');
const host = config.get<number>('host');
const corsOrigin = config.get<string>('corsOrigin');

// Initialize Express App and Create HTTP Server
const app = express();
const httpServer = createServer(app); 

// Set up Socket.IO to manage WebSocket connections
const socketServer = new Server(httpServer, {
    cors: {  // Ensures only specified domains can communicate with server
      origin: corsOrigin, 
      methods: ["GET", "POST"]
    }
  });

// Basic route to check if API is running
app.get('/', (req, res) =>  res.send('Server is up!'));

// Let the server listen to incoming connections
httpServer.listen(port, host, () => {
    // use pino logger
    logger.info(`Server is listening`);
    logger.info(`http://${host}:${port}`);

    // Pass `socketServer` to `socket()` function in socket.ts
    // to initialize the `socketServer` with event handling logic
    socket({socketServer});
});
  

