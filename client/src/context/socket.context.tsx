import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';

// Define an interface to describe the context shape
interface Context {
  socket: Socket;
  username?: string;
  setUsername: (value?: string) => void;
}

// Initialize a connection with the backend socket server
export const socket = io(SOCKET_URL);

// Create a context to store the socket instance and other values
export const SocketContext = createContext<Context>({
  socket,
  setUsername: () => {} // Provide a default no-op function to match the expected type
});

// Provider component to wrap around the app and provide the socket instance to all child components
function SocketsProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | undefined>("");

  return (
    // Pass the socket, username, and setUsername through the context provider
    <SocketContext.Provider value={{ socket, username, setUsername }}>
      {children} {/* Render any child components passed to the provider */}
    </SocketContext.Provider>
  );
}

// Custom hook to allow easy access to the socket context in any component
export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
