import React, { useState, useEffect } from "react";
import Message from "./Message";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import baseUrl from "../config/baseUrl";

function Worker() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isWorker, setIsWorker] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getUserScopes() {
      const token = await getAccessTokenSilently();
      const user = jwt_decode(token);
      return user.permissions;
    }

    if (isAuthenticated) {
      getUserScopes().then((scopes) => {
        if (!scopes.includes("upload:files")) {
          setIsWorker(true);
          getMessages();
        }
      });
    }
  }, []);

  const getMessages = async () => {
    const token = await getAccessTokenSilently();
    console.log(token)
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

  return isWorker ? (
    <>
      <div
        style={{
          paddingLeft: "10px",
          paddingTop: "10px",
          fontSize: "1.5rem",
        }}
      >
        Welcome {user.nickname}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          marginLeft: "5%",
          marginRight: "5%"
        }}
      >
        {messages.map((message) => {
              const isSaved = isMessageSavedByUser(message);
              return (
                <Message
                  key={message._id}
                  style={{ width: "100% !important" }}
                  message={message.messageContent}
                  isSaved={isSaved}
                  msgId={message._id}
                />
              );
            })}
      </div>
    </>
  ) : (
    <div>You are not authorized to view this content</div>
  );
}

export default Worker;
