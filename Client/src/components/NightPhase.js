// NightPhase.js
import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "./SocketContext";
import styles from "./NightPhase.module.css";

const NightPhase = ({ players, socketId }) => {
  const { socket } = useContext(SocketContext);
  const [playerToEliminate, setPlayerToEliminate] = useState(null);
  const [playerToProtect, setPlayerToProtect] = useState(null);
  const [playerToInvestigate, setPlayerToInvestigate] = useState(null);
  const [investigationResult, setInvestigationResult] = useState(null);
  const [nightEnded, setNightEnded] = useState(false);
  const [investigationDone, setInvestigationDone] = useState(false);
  const [eliminationDone, setEliminationDone] = useState(false);
  const [protectionDone, setProtectionDone] = useState(false);

  useEffect(() => {
    if (!socket) return;

    if (playerToEliminate && playerToProtect) {
      socket.emit("nightActions", { playerToEliminate, playerToProtect });
      // setPlayerToEliminate(null);
      // setPlayerToProtect(null);
      setNightEnded(true);
      socket.emit("nightEnded");
    }
  }, [socket, playerToEliminate, playerToProtect]);

  const handleMafiaChoice = (player) => {
    if (eliminationDone) return;
    console.log("Mafia chose to eliminate:", player);
    setPlayerToEliminate(player.socketId);
    setEliminationDone(true);
  };

  const handleDoctorChoice = (player) => {
    if (protectionDone) return;
    console.log("Doctor chose to protect:", player);
    setPlayerToProtect(player.socketId);
    setProtectionDone(true); 
  };

  const handleDetectiveChoice = (player) => {
    if (investigationDone) return; 
    console.log("Detective chose to investigate:", player);
    setPlayerToInvestigate(player);
    setInvestigationResult(player.role === "Mafia" ? "Yes" : "No");
    setInvestigationDone(true);
  };

  const playerRole = players.find((player) => player.socketId === socketId)?.role;

  return (
    <div className={styles.container}>
      {playerRole === "Mafia" && (
        <div>
          <h3 className={styles.actionTitle}>Choose a player to eliminate:</h3>
          <ul className={styles.playerList}>
            {players
              .filter((player) => player.alive && player.role !== "Mafia")
              .map((player) => (
                <li
                  key={player.socketId}
                  className={`${styles.playerListItem} ${eliminationDone && styles.disabled}`}
                  onClick={() => handleMafiaChoice(player)}
                >
                  {player.name}
                </li>
              ))}
          </ul>
        </div>
      )}

      {playerRole === "Doctor" && (
        <div>
          <h3 className={styles.actionTitle}>Choose a player to protect:</h3>
          <ul className={styles.playerList}>
            {players
              .filter((player) => player.alive)
              .map((player) => (
                <li
                  key={player.socketId}
                  className={`${styles.playerListItem} ${protectionDone && styles.disabled}`}
                  onClick={() => handleDoctorChoice(player)}
                >
                  {player.name}
                </li>
              ))}
          </ul>
        </div>
      )}

      {playerRole === "Detective" && (
        <div>
          <h3 className={styles.actionTitle}>Choose a player to investigate:</h3>
          <ul className={styles.playerList}>
            {players
              .filter((player) => player.alive && player.socketId !== socketId)
              .map((player) => (
                <li
                  key={player.socketId}
                  className={`${styles.playerListItem} ${investigationDone && styles.disabled}`}
                  onClick={() => handleDetectiveChoice(player)}
                >
                  {player.name}
                </li>
              ))}
          </ul>
          {playerToInvestigate && (
            <div className={styles.investigationResult}>
              Is <strong>{playerToInvestigate.name}</strong> a Mafia member? {investigationResult}
            </div>
          )}
        </div>
      )}
      {nightEnded && (
        <div className={styles.nightEnded}>
          The Night has ended now.
        </div>
      )}
    </div>
  );
};

export default NightPhase;