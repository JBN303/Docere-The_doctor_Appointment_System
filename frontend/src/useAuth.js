import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add your logic to check if the user is authenticated (e.g., check if there is a valid token)
    // Replace the condition with your actual authentication logic
    const isLoggedIn = localStorage.getItem('authToken') !== null;

    if (!isLoggedIn) {
      // Redirect to the login page if the user is not authenticated
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
