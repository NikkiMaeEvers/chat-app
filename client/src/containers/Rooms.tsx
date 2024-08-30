import { useState } from "react";
import { EVENTS } from "../config/events";
import { socket, useSockets } from "../context/socket.context";

export const RoomsContainer = () => {
  const {socket, roomId, rooms} = useSockets();
  const [newRoomName, setNewRoomName] = useState<string>("");

  const handleCreateRoom = () => {
    if (!String(newRoomName).trim()) return;
  
    //emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName: newRoomName });
  
    //set room name input to empty string
    setNewRoomName("");
  };
  
  
  return (
    <nav>
      <div>
        <input
          placeholder="New Room Name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
  
      {rooms.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </nav>
  );

};