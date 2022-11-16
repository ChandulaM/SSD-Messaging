import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import styles from "../styles/Manager.module.css";
import Message from "./Message";
import axios from "axios";
import baseUrl from "../config/baseUrl";

function Manager() {
  const [isManager, setIsManager] = useState(false);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getUserScopes() {
      const token = await getAccessTokenSilently();
      const user = jwt_decode(token);
      return user.permissions;
    }

    if (isAuthenticated) {
      getUserScopes().then((scopes) => {
        if (scopes.includes("upload:files")) {
          setIsManager(true);
          getMessages();
        }
      });
    }
  });

  const save = () => {
    console.log("saved");
  };

  async function getMessages() {
    const token = await getAccessTokenSilently();
    const response = await axios.get(baseUrl + "/messages/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setMessages(response.data.messages);
  }

  const isMessageSavedByUser = (message) => {
    let messageSavedByUser = false;
    message.savedBy.forEach((savedByUser) => {
      if (savedByUser === user.email) {
        messageSavedByUser = true;
      }
    });
    return messageSavedByUser;
  };

  return (
    <div className={styles.container}>
      {isManager ? (
        <>
          <div
            style={{
              width: "100%",
              paddingLeft: "10px",
              paddingTop: "10px",
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            Welcome {user.nickname}
          </div>
          <div className={styles.uploadDiv}>
            <div className={styles.fileNameRow}>
              <span className={styles.uploadDivText}>File Name</span>
              <input type="text" className={styles.fileNameInput}></input>
            </div>
            <div className={styles.fileSelectRow}>
              <span className={styles.uploadDivText}>Select file</span>
              <input type="file" className={styles.fileSelectRow}></input>
            </div>
            <button className={styles.uploadBtn}>Upload File</button>
          </div>
          <div className={styles.messagesDiv}>
            {messages.map((message) => {
              const isSaved = isMessageSavedByUser(message);
              return (
                <Message
                  key={message._id}
                  style={{ width: "100% !important" }}
                  message={message.messageContent}
                  isSaved={isSaved}
                  saveMessage={save}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div>Get out!</div>
      )}
    </div>
  );
}

export default Manager;
