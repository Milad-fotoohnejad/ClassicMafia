// import React, { useState, useEffect, useContext } from "react";
// import { SocketContext } from "./SocketContext";

// const RoleGenerator = ({ onRolesGenerated }) => {
//   const { socket } = useContext(SocketContext);

//   useEffect(() => {
//     if (!socket) return;

//     const handleRolesGenerated = (playersWithRoles) => {
//       onRolesGenerated(playersWithRoles);
//     };

//     socket.on("rolesGenerated", handleRolesGenerated);

//     return () => {
//       socket.off("rolesGenerated", handleRolesGenerated);
//     };
//   }, [socket, onRolesGenerated]);

//   // The component does not render any JSX, so there's no need for a return statement.
//   return null;
// };

// export default RoleGenerator;
