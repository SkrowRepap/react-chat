import React from 'react'
import { auth, storage, db } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { useState } from 'react';
import AddAvatar from '../img/addAvatar.png'
import { Link } from 'react-router-dom';
import { Login } from './Login';

export const Register = () => {

  const [error,setError] = useState(false)
  const [success,setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadUrl) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadUrl
            })

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadUrl,
            })

            await setDoc(doc(db, "userChats", res.user.uid), {
              
            })

          })
        }
      )
      
      

      setSuccess(true)
    } catch(err) {
      setError(true)
    }
      
    }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text"  placeholder='display name' required />
          <input type="email" placeholder='email' required/>
          <input type="password" placeholder='password' required/>
          <input type="file" name="" id="file" required/>
          <label htmlFor="file">
            <img src={AddAvatar} alt="" />
            <span >Add File</span>
          </label>
          <button>Sign up</button>
        </form>
          <p>Already have an acccount? <Link to={"/login"}>Sign in</Link></p>
          {error && <p className='error'>Something went wrong! </p>}
          {success && <p className='success'>Account created! </p>}
      </div>
    </div>
  )
}
