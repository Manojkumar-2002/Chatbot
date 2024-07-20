import React, { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import Dashboard from '../Dashboard';

function Auth() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [sessionId,setSessionId] = useState(null);

    useEffect(() => {
        const userdata = window.localStorage.getItem('user');
        const tokenInstorage = window.localStorage.getItem('token');
        const sessiionIdInStorage = window.localStorage.getItem('sessionId')

        if (userdata && tokenInstorage) {
            try {
                // Only parse if userdata is not null or undefined
                const parsedUser = JSON.parse(userdata);
                setUser(parsedUser);
                setToken(tokenInstorage);
                setSessionId(sessiionIdInStorage);
            } catch (error) {
                console.error('Error parsing user data:', error);
                // Optionally clear localStorage if parsing fails
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('sessionId');
            }
        }
    }, []);

    return (
        <div>
            {user ? (
                <Dashboard user={user} token={token} setUser={setUser} setSessionId={setSessionId} sessionId={sessionId}/>
            ) : (
                isRegistered ? (
                    <Login 
                        setIsRegistered={setIsRegistered} 
                        setToken={setToken} 
                        setUser={setUser} 
                        setSessionId={setSessionId}
                    />
                ) : (
                    <Register setIsRegistered={setIsRegistered} />
                )
            )}
        </div>
    );
}

export default Auth;
