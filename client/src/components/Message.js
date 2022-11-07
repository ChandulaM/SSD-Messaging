import React from 'react'
import styles from '../styles/Message.module.css'
import { BsBookmark, BsFillBookmarkFill, } from 'react-icons/bs'

function Message({ message, isSaved, saveMessage }) {
    return (
        <div className={styles.messageDiv}>
            <div className={styles.messageDivIconRow}>
                <button 
                className={styles.messageDivIconBtn}
                onClick={saveMessage}>
                    {isSaved
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