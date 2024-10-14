import { useState, useEffect } from 'react';

import makeTitle from "../../../utils/makeTitle.js";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    makeTitle("Добавить цитату");
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const freshUser = {
      userName,
      email,
      password
    }

    try {
      const response = await fetch('http://localhost:3000/api/post-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(freshUser)
      });

      const result = await response.json();
      
      if (response.ok) {
        setUserName("");
        setEmail("");
        setPassword("")
      }

      setMessage(result.message);
    } catch(error) {
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

        { message && <p>{ message }</p> }
      </form>
    </div>
  )
}

export default Registration;