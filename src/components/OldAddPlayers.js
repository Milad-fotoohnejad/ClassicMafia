import React, { useState, useEffect, useContext } from 'react';
import styles from './AddPlayers.module.css';
import { SocketContext } from './SocketContext';

const AddPlayers = ({ onPlayersReady }) => {
  const { socket } = useContext(SocketContext);
  const [playerInput, setPlayerInput] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [isNameAdded, setIsNameAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleBeforeUnload = (event) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    event.returnValue = "Hey! If you close the window, you cannot get back to the game again!";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
    if (!socket) return;
  
    const handlePlayerJoined = (player) => {
      setPlayerList((prevList) => [...prevList, player]);
    };
  
    const handlePlayerList = (players) => {
      setPlayerList(players);
    }; 
  
    const handleRolesGenerated = (updatedPlayerList) => {
      console.log("Updated player list with roles:", updatedPlayerList);
      setPlayerList(updatedPlayerList);
    };
  
    socket.on('player-joined', handlePlayerJoined);
    socket.on('player-list', handlePlayerList);
    socket.on("rolesGenerated", handleRolesGenerated);
  
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    socket.on('show-alert', handleShowAlert);
  
    return () => {
      socket.off('player-joined', handlePlayerJoined);
      socket.off('player-list', handlePlayerList);
      socket.off("rolesGenerated", handleRolesGenerated);
      socket.off('show-alert', handleShowAlert);
    };
  }, [socket]);
  


  // useEffect(() => {
  //   if (showAlert) {
  //     alert("Hey! If you close the window, you cannot get back to the game again!");
  //     setShowAlert(false);
  //   }
  // }, [showAlert]);

  const handleInputChange = (e) => {
    setPlayerInput(e.target.value);
  };

  const handleNextPlayer = () => {
    const newPlayer = {
      socketId: socket.id,
      name: playerInput,
    };

    socket.emit('player-name', newPlayer);
    setIsNameAdded(true);
    setPlayerInput('');
  };

  useEffect(() => {
    if (isNameAdded) {
      socket.on('player-joined', (player) => {
        if (player.socketId === socket.id) {
          setPlayerList((prevList) => [...prevList, player]);
        }
      });
    }
  }, [isNameAdded, socket]);

  const handlePlayersReady = () => {
    socket.emit("player-ready");
    onPlayersReady(playerList);
  };
  

  return (
    <div className={styles.addPlayersContainer}>
      <h1 className='text-gold text-xl mb-6'>
        Welcome, please add your name below:
      </h1>
      <div className={styles.playerCount}>{playerList.length} Players Added</div>
      <div className={styles.playerInputContainer}>
        <input
          className={styles.playerInput}
          type="text"
          value={playerInput}
          onChange={handleInputChange}
          placeholder="Enter player name"
        />
        <button
          className={styles.nextPlayerButton}
          onClick={handleNextPlayer}
          disabled={!playerInput || isNameAdded}
        >
          Add Name
        </button>
      </div>
      {playerList.length >= 7 && (
        <button className={styles.readyToPlayButton} onClick={handlePlayersReady}>
          Ready to Play
        </button>
      )}
      <div className={`${styles.playerList} ${playerList.length > 0 ? styles.visible : ''}`}>
        {playerList.map((player) => (
          <div key={player.socketId} className={styles.playerName}>
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPlayers;


