// /client/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component that checks if user is authenticated
 * If not authenticated, redirects to login page
 * If authenticated, renders the children components
 */
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // If no token exists, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    // If token exists, render the protected component
    return children;
};

export default ProtectedRoute;
