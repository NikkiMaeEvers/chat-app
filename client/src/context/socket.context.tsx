// Import necessary modules from React and Socket.IO client
import { createContext, useContext } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config/default';

// Initialize a connection with the backend socket server
export const socket = io(SOCKET_URL);

// Create a context to store the socket instance, which can be accessed by any component in the app
export const SocketContext = createContext({socket});


// Provider component to wrap around the app and provide the socket instance to all child components
function SocketsProvider({ children }: { children: React.ReactNode }) {
    return (
      // Use the context provider to pass the socket instance to any component that needs it
      <SocketContext.Provider value={{socket}}>
        {children} {/* Render any child components passed to the provider */}
      </SocketContext.Provider>
    );
  }

// Custom hook to allow easy access to the socket context in any component
// can now be used as: 'useSockets()`, compared to 'useContext(SocketContext)`
// Makes usage more clear
export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;