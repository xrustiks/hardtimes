import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import makeTitle from "../../../utils/makeTitle.js";

// Component for user profile
const Profile = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Making title for the component
    makeTitle("Профиль пользователя");
    // Check if the user is authenticated
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    // Fetching user profile data
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async() => {
    const token = localStorage.getItem('token');
    // console.log('Token:', token);

    // If login is successful, reload the page
    // Declaring a variable that contains the value of hasReloaded in localStorage
    const hasReloaded = localStorage.getItem('hasReloaded');
    // If the token exists and hasReloaded=false, reload the page
    if (token && !hasReloaded) {
      // Checking if hasReloaded=true in localStorage
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }

    try {
      // Sending a GET request to the server and waiting for the response
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json();

      setMessage(result.message);
    } catch(error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="user-profile">
      <h1>Имя пользователя</h1>
      <p>Избранные цитаты</p>

      {message && <p>{ message }</p>}
    </div>
  );
};

export default Profile;