import React, {useEffect, useState} from 'react'
import styles from '../styles/Message.module.css'
import { BsBookmark, BsFillBookmarkFill, } from 'react-icons/bs'

function Message({ message, isSaved, saveMessage }) {

    const [messageSaved, setMessageSaved] = useState(false)

    useEffect(() => {
      setMessageSaved(isSaved)
    });    

    return (
        
        <div className={styles.messageDiv}>
            <div className={styles.messageDivIconRow}>
                <button 
                className={styles.messageDivIconBtn}
                onClick={(e) => {
                    saveMessage();
                    setMessageSaved(!messageSaved)
                }}>
                    {messageSaved
                        ? <BsFillBookmarkFill />
                        : <BsBookmark />}
                </button>
            </div>
            <div className={styles.messageDivMessageRow}>
                {message}
            </div>
        </div>
    )
}

export default Message