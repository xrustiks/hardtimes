import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import makeTitle from "../../../utils/makeTitle.js";

// Component for user profile
const Profile = () => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({});
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
    <div className="user-profile">
      <h1>You are in your personal room</h1>
      <p>Username: { userData.userName }</p>
      <p>Email: { userData.email }</p>
      <p>Избранные цитаты:</p>

      { message && <p>{ message }</p> }
    </div>
  );
};

export default Profile;