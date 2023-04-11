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
  const [gameStarted, setGameStarted] = useState(false);
console.log("checking the socketID from client",socketId);

  // Generate a random color for the user
  useState(() => {
    const randomColor = "color-" + Math.floor(Math.random() * 10 + 1);
    setUserColor(randomColor);
  }, []);

  useEffect(() => {
    console.log("checking the player arrays receiev from server",players);
    // send this players array back to the server
    // socket.emit("override-ready", players);
    const player = players.find((player) => player.socketId === socketId);
    if (player) {
      setUsername(player.name);
      setRole(player.role)
      console.log("Data from Client page",player.socketId, player.name, player.role);
     
    }
  
    // const playerRole = players.find((player) => player.socketId === socketId);
    // if (playerRole) {
    //   setRole(playerRole.role);
    // }
  
    if (username && role) {
      socket.emit("gameToStart", socketId); // this was fucked uuuuuup
    }
  }, [players, socketId, socket, username, role]);
  


  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });


    socket.on("phaseChange", () => {
      console.log("Client: phaseChange event received");
      setGameStarted(true);
    });
    

    return () => {
      socket.off('message');
      socket.off("start-game"); // Clean up the start-game listener
    }
  }, [socket]);

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

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

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-header"]}>
        <h1 className={styles["player-name"]}>{username}</h1>
        <button onClick={handleRoleClick}>
          <h1 className={styles["chat-role"]}>{displayMessage}</h1>
        </button>
      </div>
      {gameStarted ? (
        <StartGame players={players} socketId={socketId} messages={messages} />
      ) : (
        <div className={styles["waiting-room"]}>Waiting for the game to start...</div>
      )}
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
