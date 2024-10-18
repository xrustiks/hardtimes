import { useState, useEffect } from 'react';

import makeTitle from "../../../utils/makeTitle.js";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Making title for the component
    makeTitle("Регистрация");
  }, [])

  const handleSubmit = async(e) => {
    // Prevent reloading page when submit
    e.preventDefault();

    // Object to be sent to server as a request
    const freshUser = {
      userName: userName,
      email: email,
      password: password
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(freshUser)
      });

      if (response.ok) {
        setUserName("");
        setEmail("");
        setPassword("");
      }

      const result = await response.json();

      setMessage(result.message);
    } catch(error) {
      console.error("Error: ", error);
      setMessage(error.message);
    }
  }

  return (
    <div className="registration">
      <form onSubmit={ handleSubmit }>
        <div className="user-name">
          <label>Имя</label>
          <input
            type="text"
            value={ userName }
            onChange={ (e) => setUserName(e.target.value) }
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
        </div>

        <button type="submit">Регистрация</button>
      </form>

      { message && <p className="message">{ message }</p> }
    </div>
  )
}

export default Registration;