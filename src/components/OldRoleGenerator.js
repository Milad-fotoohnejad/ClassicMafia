import React, { useState, useEffect, useContext } from "react";
import "./RoleGenerator.module.css";
import firebase from "firebase/compat/app";
import { db } from '../firebase';
import { setDoc, doc, addDoc, collection, getDoc, updateDoc } from "firebase/firestore";
import { SocketContext } from "./SocketContext";


const randomId = () => {
    return Math.random().toString(36).substr(2, 6);
};
// console.log(randomId());

const RandomRoleGenerator = () => {
    const [players, setPlayers] = useState("");
    const [names, setNames] = useState([]);
    const [roles, setRoles] = useState({});
    const [docId, setDocId] = useState();
    const [accessID, setAccessID] = useState();
    const { socket } = useContext(SocketContext);



    const sendRolesToDatabase = async (result) => {

        const accDocID = randomId();
        setAccessID(accDocID);
        console.log(accDocID);
        const docRef = doc(db, "rolesDoc", accDocID);
        try {
            const docId = await setDoc(docRef, result);
            console.log("Roles successfully saved to Firestore!");
            setDocId(docId.id)
        } catch (error) {
            console.error("Error saving roles to Firestore: ", error);
        }
    };

    const RetrieveRoles = async () => {


        console.log(docId);
        try {
            const docRef = doc(db, "rolesDoc", docId);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());

        } catch (err) {
            console.log(err);
        }

    };


    const GenerateRoles = () => {
        if (players < 1) {
            return alert("Do you have enough players? You guys should not be less than 6 people");
        }

        socket.emit("generateRoles", { players, names });

        socket.on("rolesGenerated", (generatedRoles) => {
          setRoles(generatedRoles);
        });

        socket.on("rolesError", (error) => {
          alert(error);
        });

        const playersArray = names.slice();
        const rolesArray = [];
        const detectives = 1;
        const doctors = 1;
        let mafias = Math.max(Math.floor((players - detectives - doctors) / 2) - 1, 2);
        let citizens = players - mafias - detectives - doctors;

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
        console.log(typeof (result));
        console.log(result);


        setRoles(result);
        sendRolesToDatabase(result);
        setPlayers("");

    };

    const handlePlayerChange = (e) => {
        setPlayers(e.target.value);
    };

    const handleNameChange = (e, index) => {
        const newNames = names.slice();
        newNames[index] = e.target.value;
        setNames(newNames);
    };

    const playerInputs = Array.from({ length: players }, (_, index) => (
        <div key={index} className="player-input text-gray-800">
            <label htmlFor={`player-${index}`}>Player {index + 1}:</label>
            <input
                id={`player-${index}`}
                type="text"
                value={names[index] || ""}
                onChange={(e) => handleNameChange(e, index)}
            />
        </div>
    ));

    // const roleAssignments = roles.map((player) => (
    //     <div key={player.name} className="role-assignment">
    //         <div className="player-name">{player.name}</div>
    //         <div className="player-role">{player.role}</div>
    //     </div>
    // ));

    // TODO: Show the generated roles in a different container
    // TODO: Add a button to generate new roles
    // TODO: set the height of the container to the height of the window

    return (
        <div className="container flex items-center justify-center random-role-generator h-auto overflow-auto">
            <div className="w-80 p-6 text-center rounded-lg shadow-lg">
                <div className="mt-6">
                    <p className="text-lg font-medium">Access ID: {accessID}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-medium">How many people?</p>
                </div>
                <div className="mb-4">
                    <label className="block text-white font-medium mb-2" htmlFor="players">
                        Number of Players:
                    </label>
                    <input
                        id="players"
                        type="number"
                        value={players}
                        onChange={handlePlayerChange}
                        className="w-full px-3 py-2 text-gray-900 bg-gold rounded-lg"
                    />
                </div>
                {playerInputs}
                <button className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" onClick={GenerateRoles}>
                    Generate Roles
                </button>
                {/* <button className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" onClick={RetrieveRoles}>
                    Retrieve
                </button> */}

                {/* <div className="mt-6">{roleAssignments}</div> */}
            </div>
        </div>

    );
};


export default RandomRoleGenerator;

