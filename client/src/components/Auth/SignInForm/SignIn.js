import { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import { FcGoogle } from "react-icons/fc"
import { FaMobileAlt } from "react-icons/fa"
import SignInWithEmail from "./SignInWithEmail/SignInWithEmail";
import SignInWithPhone from "./SignInWithPhone/SignInWithPhone";
const Login = () => {
  const [emailSignIn, setEmailSignIn] = useState(true);
  const [phoneSignIn, setEPhoneSignIn] = useState(false);
  const [googleSignIn, setGoogleSignIn] = useState(false);
  
  const useEmailSignIn = () => {
    setEmailSignIn(true);
    setEPhoneSignIn(false);
    setGoogleSignIn(false);
  }
  const usePhoneSignIn = () => {
    setEmailSignIn(false);
    setEPhoneSignIn(true);
    setGoogleSignIn(false);
  }
  const useGoogleSignIn = () => {
    setEmailSignIn(false);
    setEPhoneSignIn(false);
    setGoogleSignIn(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.form} >
        <div className={styles.heading}>Sign in</div>
        {emailSignIn && <SignInWithEmail/>}
        {phoneSignIn && <SignInWithPhone/>}

        
        <div className={styles.iconDiv}>
        { !googleSignIn && <button onClick={useGoogleSignIn}><FcGoogle /></button>} 
        { !phoneSignIn && <button onClick={usePhoneSignIn}><FaMobileAlt /></button> }
        </div>        
      </div>
    </div>
  );
};

export default Login;
