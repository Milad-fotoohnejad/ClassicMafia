const http = require("http");
const socketIO = require("socket.io");
const PORT = 8888;

const server = http.createServer();
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const players = [];
let gamePhase = "Day";
let votes = {};

const randomRoleGenerator = (playerList) => {
  const players = playerList.length;
  const names = playerList.map((player) => player.name);
  const playersArray = names.slice();
  const rolesArray = [];
  const detectives = 1;
  const doctors = 1;
  let mafias = 1;

  if (players < 6) {
    return null;
  } else if (players > 9) {
    mafias = Math.max(Math.floor((players - detectives - doctors) / 2) - 1, 2);
  }
  citizens = players - mafias - detectives - doctors;
  for (let i = 0; i < citizens; i++) {
    rolesArray.push("Citizen");
  }
  for (let i = 0; i < mafias; i++) {
    rolesArray.push("Mafia");
  }
  for (let i = 0; i < detectives; i++) {
    rolesArray.push("Detective");
  }
  for (let i = 0; i < doctors; i++) {
    rolesArray.push("Doctor");
  }

  let currentIndex = rolesArray.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = rolesArray[currentIndex];
    rolesArray[currentIndex] = rolesArray[randomIndex];
    rolesArray[randomIndex] = temporaryValue;
  }

  const result = {};
  playersArray.forEach((player, index) => {
    result[player] = rolesArray[index];
  });

  return result;
};

const changeGamePhase = () => {
  const phaseNumber = gamePhase.match(/\d+/)[0];
  const nextPhaseNumber = parseInt(phaseNumber, 10) + 1;

  if (gamePhase.includes("Day")) {
    gamePhase = `Night ${phaseNumber}`;
  } else if (gamePhase.includes("Night")) {
    gamePhase = `Day ${nextPhaseNumber}`;
  }
  io.emit("phaseChange", gamePhase);
};


io.on("connection", (socket) => {
  console.log(`A User connected: ${socket.id}`);

  socket.on("player-name", (player) => {
    player.socketId = socket.id;
    player.isReady = false;
    players.push(player);
    console.log("Updated players array:", players);
    socket.broadcast.emit("player-joined", player);
    io.emit("player-list", players);
    io.emit("show-alert");
  });

  socket.on("request-player-list", () => {
    socket.emit("player-list", players);
  });

  socket.on('player-Ready', (playerId) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].socketId === playerId) {
        players[i].isReady = true;
        players[i].alive = true; // I added this line to add alive property to player object
        console.log(`Player ${players[i].name} is ready: ${players[i].isReady}`);
        const allPlayersReady = players.every((player) => player.isReady);
        if (allPlayersReady) {
          const roles = randomRoleGenerator(players);
          players.forEach((player, index) => {
            player.role = roles[player.name];
          });
          console.log("all player ready");
          console.log(players);
          io.emit("rolesGenerated", players);
 
        } else {
          return;
        }
        break;
      }
    }
  });


  socket.on('gameToStart',()=>{
    const allPlayersReady = players.every((player) => player.isReady); // the bug might be here ... use effect
    {
    io.emit("phaseChange", gamePhase);
    // io.emit("start-game");
    }
  })

  socket.on("start-game", () => {
    console.log("Game started with players:", players);
    changeGamePhase(); // Change the game phase when the game starts
    io.emit("phaseChange", gamePhase); // Add this line to emit the phaseChange event
  });

  socket.on("vote", ({ voterSocketId, votedSocketId, hasVoted }) => {
    console.log(`User ${voterSocketId} voted for ${votedSocketId}`);
    if (!hasVoted) {
      votes[voterSocketId] = votedSocketId;
      console.log(votes);
      // Check if all alive players have voted
      const alivePlayers = players.filter(player => player.alive);
      if (Object.keys(votes).length === alivePlayers.length) {
        // Calculate and emit the voting results
        let voteCounts = {};
        Object.values(votes).forEach(votedId => {
          if (!voteCounts[votedId]) {
            voteCounts[votedId] = 1;
          } else {
            voteCounts[votedId]++;
          }
        });
      
        const sortedVoteCounts = Object.entries(voteCounts).sort(([, count1], [, count2]) => count2 - count1);
        const mostVotedPlayerSocketId = sortedVoteCounts[0][0];
        const mostVotedPlayerNumVotes = sortedVoteCounts[0][1]; // Get the number of votes for the most voted player

        io.emit("votingResults", { mostVotedPlayerSocketId, numVotes: mostVotedPlayerNumVotes });

        // Update the player's "alive" status to false
        const eliminatedPlayerIndex = players.findIndex(player => player.socketId === mostVotedPlayerSocketId);
        if (eliminatedPlayerIndex !== -1) {
          players[eliminatedPlayerIndex].alive = false;
        }
        console.log("Updated players array:", players);

        // Clear the votes object for the next voting round
        Object.keys(votes).forEach(voterSocketId => {
          delete votes[voterSocketId];
        });
      }
    }
  });


  socket.on("nightActions", ({ playerToEliminate, playerToProtect }) => {
    console.log("Night actions received");
  
    // Find the player to eliminate and player to protect in the players array
    const eliminatedPlayerIndex = players.findIndex(player => player.socketId === playerToEliminate);
    console.log("eliminatedPlayerIndex", eliminatedPlayerIndex);
    const protectedPlayerIndex = players.findIndex(player => player.socketId === playerToProtect);
    console.log("protectedPlayerIndex", protectedPlayerIndex);
  
    // Check if the player to eliminate is not the same as the player to protect
    if (eliminatedPlayerIndex !== protectedPlayerIndex && eliminatedPlayerIndex !== -1) {
      players[eliminatedPlayerIndex].alive = false;
    }
  
    // Emit updated player list
    io.emit("player-list", players);
  
    // Change the game phase to the next day when night actions are complete
    changeGamePhase();
    io.emit("phaseChange", gamePhase);
  });


  // set a timer for 5 seconds
  socket.on("dayEnded", () => {
    setTimeout(() => {
      io.emit("phaseChange", "Night");
    }, 5000);
    console.log("Day ended 212121");
  });
  



  socket.on("message", (message) => {
    console.log(`Received message: ${JSON.stringify(message)}`);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });


  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    const playerIndex = players.findIndex((player) => player.socketId === socket.id);
    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
