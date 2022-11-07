import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import jwt_decode from 'jwt-decode'

function Manager() {
  const [isManager, setIsManager] = useState(false);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function getUserScopes() {
      const token = await getAccessTokenSilently();
      const user = jwt_decode(token);
      return user.permissions;
    }

    if (isAuthenticated) {
      getUserScopes()
        .then((scopes) => {
          if (scopes.includes('upload:files')) {
            console.log("manager")
            setIsManager(true)
          }
        })
    }
  })
  return (
    isManager
      ? <div>Manager</div>
      : <div>Get out!</div>
    
  )
}

export default Manager