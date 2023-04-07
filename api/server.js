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
let gamePhase = "Day 1"; // Added a variable to store the current game phase
const votes = {};

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
  // Added a function to handle game phase changes and emit phaseChange events
  if (gamePhase === "Day 1") {
    gamePhase = "Night 1";
  } else if (gamePhase === "Night 1") {
    gamePhase = "Day 2";
  } // Add more phases as needed
  io.emit("phaseChange", gamePhase);
};

const handleVote = (voterId, votedPlayerId) => {
  if (!votes[voterId]) {
    votes[voterId] = votedPlayerId;
  }
};

const eliminatePlayer = () => {
  // Count the votes
  const voteCounts = {};
  for (const voterId in votes) {
    const votedPlayerId = votes[voterId];
    if (!voteCounts[votedPlayerId]) {
      voteCounts[votedPlayerId] = 1;
    } else {
      voteCounts[votedPlayerId]++;
    }
  }
  // Find the player with the highest vote count
  let maxVotes = 0;
  let eliminatedPlayerId = null;
  for (const playerId in voteCounts) {
    if (voteCounts[playerId] > maxVotes) {
      maxVotes = voteCounts[playerId];
      eliminatedPlayerId = playerId;
    }
  }

  // Eliminate the player and reset the votes
  const eliminatedPlayer = players.find(player => player.socketId === eliminatedPlayerId);
  if (eliminatedPlayer) {
    eliminatedPlayer.alive = false;
  }
  Object.keys(votes).forEach(voterId => delete votes[voterId]);

  // Check for game over conditions here and update the gamePhase variable if needed
  // Otherwise, change the game phase to the next phase
  changeGamePhase();
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

  socket.on("start-game", () => {
    console.log("Game started with players:", players);
    changeGamePhase(); // Change the game phase when the game starts
  });

  socket.on("vote", ({ voterId, votedPlayerId }) => {
    handleVote(voterId, votedPlayerId);
  });

  socket.on("endVoting", () => {
    eliminatePlayer();
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
