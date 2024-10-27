import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../hooks/UserContext.jsx';

import makeTitle from "../../../utils/makeTitle.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const [user, setUser] = useContext(UserContext);
  // Hook for navigating between pages
  const navigate = useNavigate();

  useEffect(() => {
    // Making title for the component
    makeTitle("Логин");
  }, [])

  const handleSubmit = async(e) => {
    // Prevent reloading page when submit
    e.preventDefault();

    try {
      // Sending a POST request to the server and waiting for the response
      const response = await fetch('http://localhost:3000/api/login', {
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
        // Transfer the user data to the context
        setUser(result.user);
        // If the login is successful, redirect to the user profile page
        navigate('/profile');
      }

      setMessage(result.message);
    } catch(error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="login">
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

      { message && <p className="message">{ message }</p> }
    </div>
  );
};

export default Login;