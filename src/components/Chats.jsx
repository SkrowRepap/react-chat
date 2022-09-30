import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'

function Chats() {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getChats = () => {

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log("Current data: ", doc.data());
        setChats(doc.data());
      });
      
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats()

  }, [currentUser.uid]);

  console.log(Object.entries(chats));

  return (
    <div className="chats">
      <div className="userChat">
        <img src="https://images.pexels.com/photos/11500401/pexels-photo-11500401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className="userChatInfo">
            <span>Christian</span>
            <p>Last message</p>
        </div>
      </div>
    </div>
  )
}

export default Chats