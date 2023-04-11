import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "./SocketContext";
import PlayersVoteList from "./PlayersVoteList";
import styles from "./DayPhase.module.css";

const DayPhase = ({ players, socketId }) => {
    const { socket } = useContext(SocketContext);
    const [hasVoted, setHasVoted] = useState(false);
    const [mostVotedPlayer, setMostVotedPlayer] = useState(null);
    const [numVotes, setNumVotes] = useState(0);
    const [dayEnded, setDayEnded] = useState(false);


    useEffect(() => {
        if (!socket) return;

        socket.on("votingResults", ({ mostVotedPlayerSocketId, numVotes }) => {
            console.log("Most voted player socket ID:", mostVotedPlayerSocketId);
            const player = players.find(p => p.socketId === mostVotedPlayerSocketId);
            setMostVotedPlayer(player);
            setNumVotes(numVotes);
        });

        return () => {
            socket.off("votingResults");
        };
    }, [socket, players]);

    useEffect(() => {
        if (mostVotedPlayer) {
            console.log("mostVotedPlayer:", mostVotedPlayer);
        }
    }, [mostVotedPlayer]);

    const handleVote = (player) => {
        console.log("Voted for:", player);
        socket.emit("vote", { voterSocketId: socketId, votedSocketId: player.socketId, hasVoted });
        setHasVoted(true);
    };

    useEffect(() => {
        if (mostVotedPlayer) {
            console.log("mostVotedPlayer:", mostVotedPlayer);
            setDayEnded(true);
            socket.emit("dayEnded"); // This will trigger the phase change to night
        }
    }, [mostVotedPlayer, socket]);


    return (
        <div>
            <PlayersVoteList players={players} socketId={socketId} onVote={handleVote} hasVoted={hasVoted} />
            {mostVotedPlayer && (
                <div>
                    <strong>{mostVotedPlayer.name}</strong>, Unfortunately you have been voted out by {numVotes} players, Bye...
                </div>
            )}
            {dayEnded && (
                <div>
                    The Day has ended now. The Night Phase will begin shortly.
                </div>
            )}
        </div>
    );
};

export default DayPhase;
