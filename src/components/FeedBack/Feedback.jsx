import React,{useEffect, useState} from 'react'
import feedbackStyles from './Feedback.module.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import app from 'Utilities/firebase'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { Rating } from 'react-simple-star-rating'
function Feedback() {

  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [rating, setRating] = useState()
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
        Body : `Hey ${email} thanks for Feedbacking with us we will be looking into your response shortly.`
    })
    .then(res => {
    })
    .catch(err => console.log(err))
    }
  }
  return (
    <div className={feedbackStyles.feedbackScreen}>
      <h1 className={feedbackStyles.title}>Feedback</h1>
      <div className={feedbackStyles.authContainer}>
          <div className={feedbackStyles.loginform}>
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
              className={feedbackStyles.email}
            />
             <div className={feedbackStyles.displayError}>{emailError}</div>
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
              className={feedbackStyles.message}
            />
            <div className={feedbackStyles.displayError}>{messageError}</div>
            <div className={feedbackStyles.starContainer}>
            <h3>How was your Experience</h3>
            <Rating
              ratingValue={rating}
              starRatedColor="blue"
              onClick={(rating) => {
                setRating(rating)
              }}
              name='rating'
            />
            </div>
            <button onClick={handleClick}>Ping</button>
        </div>
      </div>
      {/* {snackVisible && 
      <div className={feedbackStyles.snackbar}>
        <h3>{snackMessage}</h3>
      </div>} */}
    </div>
  )
}

export default Feedback