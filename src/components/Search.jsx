import React from 'react'
import { useState } from 'react'
import { collection, query, where, getDocs, doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';

const Search = () => {
  const [userSearch, setUserSearch] = useState("")
  const [error, setError] = useState(false)
  const [user, setUser] = useState(null)
  const {currentUser} = useContext(AuthContext)

  
  const handleSearch = async () => {
    console.log("Searching...");
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", userSearch));

    try {
      const querySnapshot = await getDocs(q)


      querySnapshot.forEach((users) => {
        setUser(users.data())
      });


    } catch (error) {
      setError(true)
      console.log("Error");
    }
    
    setUserSearch("")
  }

  const handleKey = (e) => {
    if (e.code === "Enter") {
      console.log("Enter Pressed");
      handleSearch();
    }
  };

  const handleSelect = async () => {
    // handle chats between two peope = currentUserId + otherUserID
    const combinedID =  currentUser.uid > user.uid 
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, "chats", combinedID))
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] } )
        
        // Current User
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid : user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedID + ".date"]: serverTimestamp()
        });

        // User
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid : currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedID + ".date"]: serverTimestamp()
        });
      }
    } catch (error) {}

    setUserSearch("")
    setUser(null)
       
  }

  const displayUserChatInfo = () => {
    const chatInfo = document.querySelector("#userChatInfo")
    chatInfo.style.display = "block"
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" value={userSearch} placeholder='Find a user' onChange={e => setUserSearch(e.target.value)} onKeyDown={handleKey} />
      </div>
      { error && <span>User not found!</span>}
      { user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} onLoad={displayUserChatInfo} />
        <div className="userChatInfo" id='userChatInfo' style={{display: "none"}}>
            <span>{user.displayName}</span>
        </div>
        
      </div> }
    </div>
  )

}

export default Search