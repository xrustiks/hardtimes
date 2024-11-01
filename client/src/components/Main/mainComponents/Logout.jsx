import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('hasReloaded');
    localStorage.removeItem('favorites');

    // Redirect to the login page
    navigate('/login');

    // Reload the page
    // Reloading is needed for user bar switched to login bar
    window.location.reload();
  }, [navigate]);

  return null;
}

export default Logout;