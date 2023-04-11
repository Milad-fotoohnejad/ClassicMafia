import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "./SocketContext";
import styles from "./StartGame.module.css";
import DayPhase from "./DayPhase";
import NightPhase from "./NightPhase";

const StartGame = ({ players, socketId, messages }) => {
  const { socket } = useContext(SocketContext);
  const [gamePhase, setGamePhase] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("phaseChange", (newPhase) => {
      console.log("StartGame: phaseChange event received:", newPhase);
      setGamePhase(newPhase);
    });


  }, [socket]);

  const displayPhaseInstructions = () => {
    if (gamePhase.includes("Day")) {
      return "Discuss and vote to eliminate a player.";
    } else if (gamePhase.includes("Night")) {
      return "Wait for the night phase to end.";
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className={styles.phaseInstructions}>{displayPhaseInstructions()}</div>
      {gamePhase.includes("Day") && (
        <DayPhase players={players} socketId={socketId} />
      )}
      {gamePhase.includes("Night") && (
        <NightPhase players={players} socketId={socketId} />
      )}
    </div>
  );
};

export default StartGame;
