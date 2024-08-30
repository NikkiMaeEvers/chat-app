import './App.css';
import { useEffect, useState } from 'react';
import { useSockets } from './context/socket.context';

function App() {
  const { socket } = useSockets(); //socket connection retrieved from context, will use to interact with server
  const [socketId, setSocketId] = useState<string | undefined>("");

  // listen for a `connect` event, update socket id
  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id));

    return () => {
      socket.off("connect", () => setSocketId(socket.id));
    };
  }, [socket]);

  // display socketID in UI
  return <div>SocketId: {socketId}</div>;
}



export default App;
