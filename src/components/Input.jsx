import React from 'react'
import Attach from '../img/attach.png'
import Img from '../img/img.png'

function Input() {
  return (
    <div className="input">
      <input type="text" id="messageForm" placeholder='Type something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" id='files' />
        <label htmlFor="files">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input