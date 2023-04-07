import React, { useState, useContext, useEffect } from "react";
import styles from "./Client.module.css";
import { SocketContext } from "./SocketContext";
import StartGame from "./StartGame";
import Chat from "./Chat";


const ClientChat = ({ players, socketId }) => {
  const { socket } = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userColor, setUserColor] = useState("");
  const [role, setRole] = useState("");
  const [roleMessage, setRoleMessage] = useState("Reveal Role");
  const [displayMessage, setDisplayMessage] = useState(roleMessage);

  // Generate a random color for the user
  useState(() => {
    const randomColor = "color-" + Math.floor(Math.random() * 10 + 1);
    setUserColor(randomColor);
  }, []);

  // Set username based on the socketId and players array
  useEffect(() => {
    const player = players.find((player) => player.socketId === socketId);
    if (player) {
      setUsername(player.name);
    }
  }, [players, socketId]);

  // Set role based on the socketId and players array
  useEffect(() => {
    const playerRole = players.find((player) => player.socketId === socketId);
    if (playerRole) {
      setRole(playerRole.role);
    }
  }, [players, socketId]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('message');
    }
  }, [socket]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (!socket || !username || !message) {
      return;
    }

    const messageObject = {
      username: username,
      message: message,
      timestamp: new Date().getTime(),
      color: userColor,
    };

    socket.emit('message', messageObject);

    setMessage("");
  };


  const handleRoleClick = () => {
    if (roleMessage === "Reveal Role") {
      setDisplayMessage(role);
      setTimeout(() => {
        setDisplayMessage("Reveal Role");
      }, 3000);
    }
  };


  const startGame = () => {
    // Generate roles and update the players array
    const playersWithRoles = players.map((player) => ({
      ...player,
      alive: true,
    }));

    // Emit start-game event to the server with the updated players array
    socket.emit("start-game", playersWithRoles);
  };

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-header"]}>
        <h1 className={styles["player-name"]}>{username}</h1>
        <button onClick={handleRoleClick}>
          <h1 className={styles["chat-role"]}>{displayMessage}</h1>
        </button>
      </div>
      <Chat messages={messages} username={username} userColor={userColor} />
      <div className={styles["chat-input-container"]}>
        <input
          type="text"
          id="message-input"
          placeholder="Type your message here..."
          value={message}
          onChange={handleMessageChange}
        />
        <button
          id="send-button"
          className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default ClientChat;
