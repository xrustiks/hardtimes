import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import makeTitle from "../../../utils/makeTitle.js";
import getApiUrl from '../../../utils/apiConfig.js';

// Component for user profile
const Profile = () => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(true);

  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  // console.log('Token:', token);

  useEffect(() => {
    // Making title for the component
    makeTitle("Профиль пользователя");
    // If a user is authenticated, redirect to the login page
    if (!token) {
      navigate('/login');
      return;
    }

    // Checks if a user is admin
    const checkIsAdmin = async() => {
      try {
        const response = await fetch(getApiUrl('/api/profile'), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const result = await response.json();
  
        if (!response.ok || !result.user.isAdmin) {
          setIsAdmin(false);
        }
      } catch(error) {
        setMessage(error.message);
      }
    }

    checkIsAdmin();

    // Fetches user profile data
    const fetchProfile = async() => {
      // If login is successful, reload the page
      // Declaring a variable that contains the value of hasReloaded in localStorage
      const hasReloaded = localStorage.getItem('hasReloaded');
      // If the token exists and hasReloaded=false, reload the page
      // Reloading is needed for login bar switched to user bar
      if (token && !hasReloaded) {
        // Checking if hasReloaded=true in localStorage
        localStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      }
  
      try {
        // Sending a GET request to the server and waiting for the response
        const response = await fetch('http://localhost:3000/api/profile', {
          method: 'GET',
          // Server side cannot take the token from the localStorage
          // That's why it must be sent in the headers of the request
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const result = await response.json();
        setUserData(result.user);
  
        setMessage(result.message);
      } catch(error) {
        setMessage(error.message);
      }
    }

    fetchProfile();
  }, [navigate, token]);

  return (
    <div className="profile-page">
      <h1>Личный кабинет</h1>

      <div className="profile-page-content">
        <p>Имя пользователя: { userData.userName } | <Link to="/profile/settings/change-login">Изменить</Link></p>
        <p>Email: { userData.email } | <Link to="/profile/settings/change-email">Изменить</Link></p>
        <p><Link to="/profile/settings/change-password">Сменить пароль</Link></p>
        <p><Link to="/favorites">Избранные цитаты</Link></p>
        { isAdmin ? <Link to="/post-quote">Добавить цитату</Link> : null }
      </div>

      <div className="result-message">
        { message && <p>{ message }</p> }
      </div>
    </div>
  );
};

export default Profile;