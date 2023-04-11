import React from 'react';
import styles from './PlayersVoteList.module.css';

const PlayersVoteList = ({ players, socketId, onVote, hasVoted }) => {
  const alivePlayers = players.filter(player => player.alive && player.socketId !== socketId);

  const handleVote = (player) => {
    if (!hasVoted) {
      onVote(player);
    }
  };

  return (
    <div className={styles.voteListContainer}>
      <h3>Vote to eliminate a player:</h3>
      <ul className={styles.voteList}>
        {alivePlayers.map(player => (
          <li key={player.socketId}>
            <button className={styles.voteButton} onClick={() => handleVote(player)} disabled={hasVoted}>
              {player.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersVoteList;
