import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import makeTitle from "../../../utils/makeTitle.js";
import getApiUrl from '../../../utils/apiConfig.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Hook for navigating between pages
  const navigate = useNavigate();

  useEffect(() => {
    // Making title for the component
    makeTitle("Логин");
  }, [])

  // Send login and password to the server
  const handleSubmit = async(e) => {
    // Prevent reloading page when submit
    e.preventDefault();

    try {
      // Sending a POST request to the server and waiting for the response
      const response = await fetch(getApiUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Data to be sent to the server in the body of the request (converted to JSON)
        body: JSON.stringify({ email: email, password: password })
      })
      // console.log('Response: ', response);

      const result = await response.json();
      // console.log('Result: ', result.user);

      if (response.ok) {
        localStorage.setItem('token', result.token);
        setEmail("");
        setPassword("");
        
        // If the login is successful, redirect to the user profile page
        navigate('/profile');
      }

      setMessage(result.message);
    } catch(error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="login-page">
      <h1>Введите свои данные</h1>

      <div className="login-page-content">
        <form onSubmit={ handleSubmit }>
          <div className="user-name">
            <label>Почта</label>
            <input
              type="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
          </div>

          <div className="user-name">
            <label>Пароль</label>
            <input
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              required
            />
          </div>

          <button type="submit">Логин</button>
        </form>
      </div>

      <div className="result-message">
        { message && <p className="message">{ message }</p> }
      </div>
      
    </div>
  );
};

export default Login;