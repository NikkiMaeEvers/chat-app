import { Server, Socket } from 'socket.io'; // to manage websocket connectsion
import logger from './utils/logger';


// Define events to handle WebSocket connections
const EVENTS = {
    connection: 'connection',
};
  
// function to handle Websocket connections
function socket({ socketServer }: { socketServer: Server }) {
    logger.info('Sockets enabled');
      
    // Listen for `connection` events on socketServer
    // In the background `socket.io` automatically creates a new `socket` representing the connection between server and that client.
    socketServer.on(EVENTS.connection, (socket: Socket) => {
      logger.info(`User connected ${socket.id}`);
  });
}
  
export default socket;
  