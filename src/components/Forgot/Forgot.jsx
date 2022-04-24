import React,{useState} from 'react'
import loginStyles from 'components/Login/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import app from 'Utilities/firebase'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
function Forgot() {

  const [login, setLogin] = useState()
  const [email, setEmail] = useState()
  const [signUp, setSignUp] = useState()
  const [snackMessage,setSnackMessage] = useState()
  const [emailError, setEmailError] = useState()
  const [snackVisible,setSnackVisible] = useState(false)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const navigate = useNavigate()
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  

  const handleHover = (e) => {
    console.log(e.target.className)
    if(e.target.className == "Login_left__IZaSL"){
        console.log(e.target.className)
        setSignUp("Sign-Up Page")
    }
    if(e.target.className == "Login_right__vziJ1"){
      setSignUp("Login Page")
    }

  }
  
  const handleRightNavigation = () => {
    navigate('/signup')
  }

  const handleLeftNavigation = () => {
    navigate('/login')
  }
  const handleMouseOut = (e) => {
    if(e.target.className == "Login_left__IZaSL"){
        setSignUp()
    }
    if(e.target.className == "Login_right__vziJ1"){
        setSignUp()
    }
  }

  const handleClick = async () => {
    if(emailRegex.test(email)){
      const q = query(collection(db,"Users"), where("email", "==", email))
      const docs = await getDocs(q)
      if(docs.docs.length === 0){
          setEmailError("No User with such email!!!")
      }
      else{
        sendPasswordResetEmail(auth,email)
        .then(() => {
          setSnackVisible(true)
          setSnackMessage("Reset Email has been sent Successfully!!!")
          setTimeout(() => {
                        setSnackVisible(false);
                        // navigate("/")
                    },5000)
        })
        .catch(err => {

        })
      }
    }
    else{
      setEmailError("Enter A Valid Email")
    }
  }
  return (
    <>
      <div className={loginStyles.title}>Forgot</div>
      <div className={loginStyles.authContainer}>
        <img src="/left.png" alt="" srcSet="" onClick={handleRightNavigation} height="100px" className={loginStyles.left} onMouseOver={handleHover} onMouseOut={handleMouseOut}/>
        <div className="signup">{signUp}</div>
        <div className={loginStyles.loginform}>
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
              className={loginStyles.email}
            />
            <div className={loginStyles.displayError}>{emailError}</div>
            <button onClick={handleClick}>Forgot</button>
        </div>
        <img src="/right.png" alt="" srcSet="" height="100px" onClick={handleLeftNavigation} className={loginStyles.right} onMouseOver={handleHover} onMouseOut={handleMouseOut}/>
        <div className="login">{login}</div>
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

export default Forgot