import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                // Logic to check if user is logged in
                // This could be a call to an API endpoint
                const response = await fetch('/api/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const userData = await response.json();
                    login(userData);
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Error checking user login status:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkUserLoggedIn();
    }, [login, logout]);

    return { user, loading, login, logout };
};

export default useAuth;