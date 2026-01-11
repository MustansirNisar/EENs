import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user session
        const storedUser = localStorage.getItem('eens_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login
        const mockUser = { email, name: email.split('@')[0] };
        setUser(mockUser);
        localStorage.setItem('eens_user', JSON.stringify(mockUser));
        return true;
    };

    const register = (userData) => {
        // Mock register
        const newUser = { ...userData };
        setUser(newUser);
        localStorage.setItem('eens_user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eens_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
