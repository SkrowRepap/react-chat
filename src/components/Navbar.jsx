import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = e => {
    e.preventDefault()
    signOut(auth)
    navigate(0)
  }

  return (
    <div className="navbar">
        <span className="logo">React Chat</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={handleLogout}> Logout </button>
        </div>

    </div>
  )
}

export default Navbar