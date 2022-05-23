import React,{useState} from 'react'
import loginStyles from 'components/SignUp/SignUp.module.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import app from 'Utilities/firebase';
import { collection, query, where, setDoc, getFirestore, doc, addDoc, getDocs } from "firebase/firestore"; 

function SignUp() {
  const [email, setEmail] = useState()
  const db = getFirestore(app)
  const [credentialError, setCredentialError] = useState()
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const [isEmail, setIsEmail] = useState()
  const [isPhone, setIsPhone] = useState()
  const [confirmationResult,setConfirmationResult] = useState()
  const [password, setPassword] = useState()
  const [login, setLogin] = useState()
  const navigate = useNavigate()
  const [passwordError, setPasswordError] = useState()
  const [ageError, setAgeError] = useState()
  const [firstName, setFirstName] = useState()
  const [signUp, setSignUp] = useState()
  const [phoneError,setPhoneError] = useState()
  const [lastName, setLastName] = useState()
  const auth = getAuth(app);
  const [snackMessage,setSnackMessage] = useState()
  const [snackVisible,setSnackVisible] = useState(false)
  const [dob, setDOB] = useState()

  const [phone, setPhone] = useState()
  const [otp,setOTP] = useState()
  const [otpScreenVisible,setOTPScreenVisible] = useState()

  const  handleRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              console.log(response)
            }
          }, auth);
  }

  const handlePhone = async () => {
    const verifier = window.recaptchaVerifier
    console.log(verifier)
    if(verifier){
      const result = await signInWithPhoneNumber(auth,phone,verifier)
    }
  } 

  const handleSignIn = () => {
        window.confirmationResult.confirm(otp).then(async(result) => {
            // User signed in successfully.
            const user = result.user;
            // setMessage("User SignIn Success!!")
            // setMessageVisible(true)
            // setTimeout(() => {
            //     setMessageVisible(false)
            // },2000)
            const q = query(collection(db,"Users"),where("phone", "==", phone))
            const docs = await getDocs(q)
            if(docs.docs.length === 0){
                try {
                    await setDoc(doc(db,"Users", user.uid),{
                        phone: phone,
                        uid: user.uid
                    });
                } catch (error) {
                    console.log(error)
                }
            }
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
  }

  const handleSubmit = async () => {
    if(emailRegex.test(email)){
      setEmail(email)
      setIsEmail(true)
    }
    else{
      setCredentialError("Enter Valid EMail")
    } 
    if(phoneRegex.test(phone)){
      setPhone(phone)
      setIsPhone(true)
    }
    else{
      setPhoneError("Enter Valid Phone Number")
    }

    if(!passwordRegex.test(password)){
        setPasswordError("Your password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    }
    if(!email){
      setEmail("")
    }
    else if(!phone){
      setPhone("")
    }
    var ageY = new Date().getFullYear() - new Date(dob).getFullYear();          
    if(ageY < 13){
      setAgeError("You are not 13 years old so you will not be alloweed to go through us")
    }

    if(!credentialError && !passwordError && !ageError){
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in 
        setSnackVisible(true)
        setSnackMessage("Sign Up Successful")
        setTimeout(() => {setSnackVisible(false);navigate("/");},5000)
        const user = userCredential.user;
        // Add a new document with a generated id.
        
        localStorage.setItem("UID",user.uid)
        const docs = await getDocs(query(collection(db,"Users")),where("email","==",user?.email))
        if(docs.docs.length == 0){
          const docRef = await setDoc(doc(db, "Users", user.uid), {
            uid: user.uid,
            FirstName: firstName,
            LastName: lastName,
            birthDate: dob,
            email,
            password,
            phone
          });
          await addDoc(collection(db,"Search"),{
            uid: user.uid,
            movie:[],
            books:[]
          })
        }
        
        // const userRef = collection(db, "Users")
        // const q = query(userRef, where("uid", "==", user.uid))
        // if(docRef) {
          // const dex = await db.uid.put({
          //   uid:user?.uid,
          //   firstName :firstName,
          //   lastName : lastName,
          //   email : email,
          //   phone : phone,
          //   password:password
          // },user.uid)
          // console.log(dex)
        // }
        })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
      });
    }
  }
  const handleCredentialChange = (e) => {
    setCredentialError()
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
      setPasswordError()
      setPassword(e.target.value)
  }
  const handleHover = (e) => {
    if(e.target.className == "Login_left__IZaSL"){
        setSignUp("Forgot Password")
    }
    if(e.target.className == "Login_right__vziJ1"){
      setSignUp("Login Page")
    }

  }

  const handleRightNavigation = () => {
      navigate('/login')
  }

  const handleLeftNavigation = () => {
    navigate('/forgot')
  }
  const handleMouseOut = (e) => {
    if(e.target.className == "Login_left__IZaSL"){
        setSignUp()
    }
    if(e.target.className == "Login_right__vziJ1"){
        setSignUp()
    }
  }
  return (
    <div className={loginStyles.signupScreen}>
      <div className={loginStyles.title}><h1>SignUp</h1></div>
      <div className={loginStyles.authContainer}>
        <img src="/left.png" alt="" srcSet="" height="100px" onClick={handleRightNavigation} className={loginStyles.left} onMouseOver={handleHover} onMouseOut={handleMouseOut}/>
        <div className="signup">{signUp}</div>
        <div className={loginStyles.loginform}>
          {/* {!otpScreenVisible ?  */}
                <>
                  <div className={loginStyles.container}>
                    <input type="text" placeholder='Enter Your First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} name="" id="" className={loginStyles.first_name}/>
                    <input type="text" placeholder='Enter Your Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} name="" id="" className={loginStyles.last_name}/>
                  </div>
                    <input type="date" style={ageError ? {border: "1px solid red"} : {}} placeholder='Enter Your DOB' name="" value={dob} onChange={(e) => {setDOB(e.target.value);setAgeError()}} id="" className={loginStyles.dob}/>
                    <div className={loginStyles.displayError}>{ageError}</div>
                    <input type={"email"} style={credentialError ? {border: "1px solid red"} : {}} placeholder={`Enter Your EMail`} name="" value={email} onChange={handleCredentialChange} id="credential" className={loginStyles.email}/>
                    <div className={loginStyles.displayError}>{credentialError}</div>
                    <input type="tel" placeholder='Enter Your Phone' name="" value={phone} onChange={(e) => {setPhone(e.target.value);setPhoneError()}} id="" className={loginStyles.phone}/>
                    <div className={loginStyles.displayError}>{phoneError}</div>
                    <input type="password" style={passwordError ? {border: "1px solid red"} : {}} placeholder='Enter Your Password' value={password} onChange={handlePasswordChange} name="" id="" className={loginStyles.password}/>
                    <div className={loginStyles.displayError}>{passwordError}</div>
                    <button onClick={handleSubmit} id='sign-in-button'>Sign Up</button>
                </>
                 {/* :
                <>
                  <input type="text" placeholder='Enter OTP Received' value={otp} onChange={(e) => setOTP(e.target.value)} name="" id="" className={loginStyles.email}/>
                  <button id='sign-in-button' onClick={handleSignIn}>Sign Up</button>
                </> */}
        </div>
        <img src="/right.png" alt="" srcSet="" height="100px" onClick={handleLeftNavigation} className={loginStyles.right} onMouseOver={handleHover} onMouseOut={handleMouseOut}/>
        <div className="login">{login}</div>
      </div>
      {snackVisible && 
      <div className={loginStyles.snackbar}>
        <h3>{snackMessage}</h3>
      </div>}
      {/* <div className={loginStyles.buttons}>
        <button>Google</button>
        <button>Magic Link</button>
      </div> */}
    </div>
  )
}

export default SignUp