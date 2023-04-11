import React from "react";
import styles from "./Client.module.css";

const Chat = ({ messages, username }) => {
  return (
    <div className={styles["chat-messages"]}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            message.username === username ? styles.sent : styles.received
          }`}
        >
          <span className={`${styles.username} ${styles[message.color]}`}>
            {message.username}:
          </span>{" "}
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default Chat;
