import { useEffect, useState } from "react";
import { MessagesContainer, RoomsContainer } from "./containers";
import { useSockets } from "./context/socket.context";

function App() {
  const { socket, username, setUsername } = useSockets();  // Access context values
  const [socketId, setSocketId] = useState<string | undefined>("");
  const [usernameInput, setUsernameInput] = useState<string>(""); // Create state for username input

  // listen for a `connect` event, update socket id
  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id));

    return () => {
      socket.off("connect", () => setSocketId(socket.id));
    };
  }, [socket]);

  const handleSetUsername = () => {
  if (!usernameInput.trim()) return; //exit function if username is empty

  setUsername(usernameInput); // Update the context with the new username
  localStorage.setItem("username", usernameInput); // Save the username in localStorage
  };

  // If no username is set, show login form
  if (!username) {
    return (
      <div>
        <input
          placeholder="Enter your username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)} // Update usernameInput on user input
        />
        <button onClick={handleSetUsername}>Log In</button>
      </div>
    );
  }

  // If username is set, render main app content (rooms and messages)
  return (
    <div>
      <RoomsContainer />
      <MessagesContainer />
    </div>
  );
}

export default App;


