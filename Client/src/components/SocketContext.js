import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext({
      playerlist : [],
      setPlayer: () =>{},

});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);



  useEffect(() => {
    const newSocket = io("http://localhost:8888");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
