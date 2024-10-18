import { useState, useEffect } from 'react';

import makeTitle from "../../../utils/makeTitle.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    makeTitle("Логин");
  }, [])

  const handleSubmit = async(e) => {
    // Prevent reloading page when submit
    e.preventDefault();

    // Object to be sent to server as a request
    const user = {
      email: email,
      password: password
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        setEmail("");
        setPassword("");
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