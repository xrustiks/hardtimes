import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('hasReloaded');

    // Redirect to the login page
    navigate('/login');

    // Reload the page
    window.location.reload();
  }, [navigate]);

  return null;
}

export default Logout;