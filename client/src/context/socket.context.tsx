import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import { EVENTS } from '../config/events';


interface Room {
  id: string;
  name: string;
}

interface Context {
  socket: Socket;
  username?: string;
  setUsername: (value?: string) => void;
  roomId?: string;
  rooms: Room[];
}
// Initialize a connection with the backend socket server
export const socket = io(SOCKET_URL);

// Create a context to store the socket instance and other values
export const SocketContext = createContext<Context>({
  socket,
  setUsername: () => {}, // Provide a default no-op function to match the expected type
  rooms: [{id: "", name: ""}]
});

// Provider component to wrap around the app and provide the socket instance to all child components
function SocketsProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | undefined>("");
  const [roomId, setRoomId] = useState<string | undefined>("");
  const [rooms, setRooms] = useState<Room[]>([{ id: "", name: "" }]);

  // Listen to sockets for available rooms, set rooms on UI
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });
  
  // Listen to sockets if user joined a room, update room id
  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
  });

  return (
    // Pass the socket, username, and setUsername through the context provider
    <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId }}>
      {children} {/* Render any child components passed to the provider */}
    </SocketContext.Provider>
  );
}

// Custom hook to allow easy access to the socket context in any component
export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
