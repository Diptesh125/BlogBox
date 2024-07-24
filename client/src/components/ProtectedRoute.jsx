import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isLoaded, userId } = useAuth();

    if (!isLoaded) {
        return <div>Loading...</div>; // or some loading indicator
    }

    return userId ? children : <Navigate to="/signIn" />;
};

export default ProtectedRoute;
