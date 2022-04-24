import React,{useEffect, useState} from 'react'
import contactStyles from './Contact.module.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import app from 'Utilities/firebase'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
function Contact() {

  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [messageError, setMessageError] = useState()
  const [snackMessage,setSnackMessage] = useState()
  const [emailError, setEmailError] = useState()
  const [snackVisible,setSnackVisible] = useState(false)
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://smtpjs.com/v3/smtp.js";
    script.async = true;
  
    document.body.appendChild(script);
  },[])

  const handleClick = async () => {
    if(emailRegex.test(email)){
      setEmail(email)
    }
    else{
      setEmailError("Enter Valid EMail")
    }
    if(!message){
      setMessageError("🤌 message")
    } 

    if(!messageError && !emailError){
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : process.env.REACT_APP_GMAIL,
        Password : process.env.REACT_APP_PASSWORD,
        To : email,
        From : process.env.REACT_APP_GMAIL,
        Subject : `Received Your Message`,
        Body : `Hey ${email} thanks for contacting with us we will be looking into your response shortly.`
    })
    .then(res => {
    })
    .catch(err => console.log(err))
    }
  }
  return (
    <>
      <h1 className={contactStyles.title}>Contact</h1>
      <div className={contactStyles.authContainer}>
          <div className={contactStyles.loginform}>
            <input 
              style={emailError ? {border: "1px solid red"} : {}} 
              type="email" 
              placeholder='Enter Your EMail' 
              name="" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError()
              }}
              id="" 
              className={contactStyles.email}
            />
             <div className={contactStyles.displayError}>{emailError}</div>
            <textarea 
              style={messageError ? {border: "1px solid red"} : {}} 
              type="text" 
              placeholder='Message' 
              name="" 
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageError()
              }}
              id="" 
              className={contactStyles.message}
            />
            <div className={contactStyles.displayError}>{messageError}</div>
            <button onClick={handleClick}>Ping</button>
        </div>
      </div>
      {/* {snackVisible && 
      <div className={contactStyles.snackbar}>
        <h3>{snackMessage}</h3>
      </div>} */}
    </>
  )
}

export default Contact