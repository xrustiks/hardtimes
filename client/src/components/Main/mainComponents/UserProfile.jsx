import { useEffect, useState } from 'react';

import makeTitle from "../../../utils/makeTitle.js";

// Component for user profile
const UserProfile = () => {
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    // Making title for the component
    makeTitle("Профиль пользователя");
    // Fetching user profile data
    fetchProfile();
  }, [])

  const fetchProfile = async() => {
    const token = localStorage.getItem('token');

    try {
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

      {message && <p>{message}</p>}
    </div>
  );
};

export default UserProfile;