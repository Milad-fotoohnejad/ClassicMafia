import React, { useState, useContext } from 'react';
import ClientChat from '../components/Client';
import AddPlayers from '../components/AddPlayers';
import { SocketContext } from '../components/SocketContext';

function Game() {
  const [players, setPlayers] = useState([]);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  // Get the socket object from the SocketContext
  const { socket } = useContext(SocketContext);

  const handlePlayersReady = (playerList) => {
    setPlayers(playerList);
    setIsReadyToPlay(true);
  };

  return (
    <div className="bodyBackground container text-dark mx-auto py-12 font-nav-font">
      {!isReadyToPlay && <AddPlayers onPlayersReady={handlePlayersReady} />}
      {isReadyToPlay && <ClientChat players={players} socketId={socket.id} />}
    </div>
  );
}

export default Game;
