import React, { useState, useEffect } from 'react'
import Message from './Message'
import { useAuth0 } from '@auth0/auth0-react'
import jwt_decode from 'jwt-decode'

function Worker() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isWorker, setIsWorker] = useState(false);

  useEffect(() => {
    async function getUserScopes() {
      const token = await getAccessTokenSilently();
      const user = jwt_decode(token);
      return user.permissions;
    }

    if (isAuthenticated) {
      getUserScopes()
        .then((scopes) => {
          if (!scopes.includes('upload:files')) {
            setIsWorker(true)
          }
        })
    }
  })

  function save() {
    console.log("message was saved")
  }

  return (
    isWorker
      ?
      <>
        <div style={{
          paddingLeft: '10px',
          paddingTop: '10px',
          fontSize: '1.5rem'
        }}>Welcome {user.nickname}</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Message message="Message 1" isSaved={true} saveMessage={save} />
          <Message message="Message 2" isSaved={false} saveMessage={save} />
          <Message message="Message 3" isSaved={true} saveMessage={save} />
        </div>

      </>
      : <div>Not authorized</div>
  )
}

export default Worker