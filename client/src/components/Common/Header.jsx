import React from 'react'
import styles from '../../styles/Header.module.css'

function Header() {
    return (
        <div className={styles.headerDiv}>
            <div className={styles.headerTitleDiv}>
                SSD Secure Messenger
            </div>
        </div>
    )
}

export default Header