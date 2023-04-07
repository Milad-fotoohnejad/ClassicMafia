import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "./SocketContext";
import styles from "./StartGame.module.css";
import Chat from "./Chat";

const StartGame = ({ players, socketId }) => {
  const { socket } = useContext(SocketContext);
  const [gamePhase, setGamePhase] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("phaseChange", (newPhase) => {
      setGamePhase(newPhase);
    });

    return () => {
      socket.off("phaseChange");
    };
  }, [socket]);

  const handleVote = (votedPlayerId) => {
    socket.emit("vote", { voterId: socketId, votedPlayerId });
  };

  const displayPhaseInstructions = () => {
    switch (gamePhase) {
      case "day":
        return "Discuss and vote to eliminate a player.";
      case "night":
        return "Wait for the night phase to end.";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className={styles.phaseInstructions}>
        {displayPhaseInstructions()}
      </div>
      {gamePhase === "day" &&
        players.map((player, index) => (
          <div key={index} className={styles.playerVote}>
            {player.alive ? (
              <>
                {player.name}
                <button
                  onClick={() => handleVote(player.socketId)}
                  disabled={socketId === player.socketId}
                >
                  Vote
                </button>
              </>
            ) : (
              <s>{player.name}</s>
            )}
          </div>
        ))}
      <Chat players={players} socketId={socketId} />
    </div>
  );
};

export default StartGame;
