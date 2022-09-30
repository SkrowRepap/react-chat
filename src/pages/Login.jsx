import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


export const Login = () => {
  
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(0)

    } catch (err) { 
      setError(true)
    }

  };
  
    return (
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">React Chat</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <button type='submit'>Sign in</button>
          </form>
            <p>Don't have an acccount? <Link to={"/register"}> Sign up </Link></p>
            {error && <p className='error'> Email or password may incorrect! Try again.</p>}
        </div>
      </div>
    )
}
