// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page or home page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="text-center p-4">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
