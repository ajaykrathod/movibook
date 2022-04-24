import React,{useEffect, useState} from 'react'
import loginStyles from 'components/Login/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from 'Utilities/firebase'
import { getFirestore } from 'firebase/firestore'


function Login() {

  const [loginMessage, setLoginMessage] = useState()
  const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const [passwordError, setPasswordError] = useState()
  const auth = getAuth(app)
  const db = getFirestore(app)
  const [credentialError, setCredentialError] = useState()
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const [signUpMessage, setSignUpMessage] = useState()
  
  const [snackMessage,setSnackMessage] = useState()
  const [snackVisible,setSnackVisible] = useState(false)

  const handleHover = (e) => {
    if(e.target.className == "Login_left__IZaSL"){
        setSignUpMessage("Forgot Page")
    }
    if(e.target.className == "Login_right__vziJ1"){
      setLoginMessage("Sign Up Page")
    }

  }
  
  const handleRightNavigation = () => {
      navigate('/signup')
  }

  const handleLeftNavigation = () => {
    navigate('/forgot')
  }
  const handleMouseOut = (e) => {
    if(e.target.className == "Login_left__IZaSL"){
        setSignUpMessage()
    }
    if(e.target.className == "Login_right__vziJ1"){
        setLoginMessage()
    }
  }

  const handleSubmit = () => {
    if(emailRegex.test(email) && passwordRegex.test(password)){
      signInWithEmailAndPassword(auth,email,password)
      .then(user => {
        
        setSnackVisible(true)
        setSnackMessage("Login Successful!!!")
        setTimeout(() => {
                      setSnackVisible(false);
                      navigate("/")
                  },5000)
        
          localStorage.setItem("UID",user.user?.uid)
        // const dex = await db.uid.put({
        //   uid:user?.uid,
        //   email : email
        // },user.uid)
      })
      .catch(err => console.log(err.message))
    }
    if(!emailRegex.test(email)){
        setCredentialError("Enter Valid EMail")
    }
    if(passwordRegex.test(password)){
      setPasswordError("Your password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    }
      
  }

  return (
    <>
      <div className={loginStyles.title}><h1>Login</h1></div>
      <div className={loginStyles.authContainer}>
        <div className={loginStyles.leftContainer}>
          <img src="/left.png" alt="" srcSet="" height="100px" onClick={handleRightNavigation} className={loginStyles.left} onMouseOver={handleHover} onMouseOut={handleMouseOut}/>
          <div className={loginStyles.signupMessage}>{signUpMessage}</div>
        </div>
        <div className={loginStyles.loginform}>
            <input style={credentialError ? {border: "1px solid red"} : {}} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your EMail' name="" id="" className={loginStyles.email}/>
            <div className={loginStyles.displayError}>{credentialError}</div>
            <input style={passwordError ? {border: "1px solid red"} : {}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password'  name="" id="" className={loginStyles.password}/>
            <div className={loginStyles.displayError}>{passwordError}</div>
            <button onClick={handleSubmit}>Login</button>
        </div>
        <div className={loginStyles.rightContainer}>
          <img src="/right.png" alt="" srcSet="" height="100px" onClick={handleLeftNavigation} className={loginStyles.right} onMouseOver={handleHover} onMouseOut={handleMouseOut}/>
          <div className={loginStyles.loginMessage}>{loginMessage}</div>
        </div>
      </div>
      {snackVisible && 
      <div className={loginStyles.snackbar}>
        <h3>{snackMessage}</h3>
      </div>}
      <div className={loginStyles.buttons}>
        <button>Google</button>
        {/* <button>Magic Link</button> */}
      </div>
    </>
  )
}

export default Login