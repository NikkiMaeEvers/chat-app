import { Server, Socket } from 'socket.io'; // to manage websocket connectsion
import logger from './utils/logger';
import {v4} from 'uuid';

interface Room {
  id: string;
  name: string;
}

// Define events to handle WebSocket connections
const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
  },
};

// List of all chat rooms
const rooms: Room[] = [{ id: "", name: "" }];

// function to handle Websocket connections
function socket({ socketServer }: { socketServer: Server }) {
  logger.info('Sockets enabled');
    
  // Listen for `connection` events on socketServer
  // In the background `socket.io` automatically creates a new `socket` representing the connection between server and that client.
  socketServer.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      logger.info(`Created Room: ${roomName}`);

      const roomId = v4(); // Generate a unique ID for the new room
      rooms.push({ id: roomId, name: roomName }); // Add the new room to the rooms array

      socket.join(roomId); // The user who created the room automatically joins it

      // Broadcast the updated list of rooms to all clients except the one that triggered the event
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      // Send the updated list of rooms back to the client who created the room
      socket.emit(EVENTS.SERVER.ROOMS, rooms);

      // Inform the client that they have successfully joined the new room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
}
  
export default socket;
  