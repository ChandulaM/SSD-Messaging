import React from 'react'
import Header from './Header'
import styles from '../../styles/Login.module.css'

function Login() {
    return (
        <>
            <Header />

            <div className={styles.loginBody}>
                <div className={styles.loginMainDiv}>
                    <div className={styles.loginMainDivTitle}>
                        Login
                    </div>
                    <div className={styles.loginMainDivInputs}>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                    </div>
                    <button>Login</button>
                </div>
            </div>

        </>
    )
}

export default Login