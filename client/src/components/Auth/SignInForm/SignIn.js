import { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import { FcGoogle } from "react-icons/fc"
import { FaMobileAlt } from "react-icons/fa"
import SignInWithEmail from "./SignInWithEmail/SignInWithEmail";
import SignInWithPhone from "./SignInWithPhone/SignInWithPhone";
const Login = () => {
  const [signInMethods, setSignInMethods] = useState(() => {
    const method = [3];
    // 0 email
    // 1 phone
    // 2 gmail
    method[0] = true; 
    method[1] = false;
    method[2] = false;
    return method;
  });
  console.log(signInMethods);
  const useEmail = () => {
    setSignInMethods(prev => {
      prev[0] = true;
      prev[1] = false;
      prev[2] = false;
      return prev;
    })
  }
  const useGmail = () => {
    setSignInMethods(prev => {
      prev[0] = false;
      prev[1] = false;
      prev[2] = true;
      return prev;
    })
  }
  const usePhone = () => {
    setSignInMethods(prev => {
      prev[0] = false;
      prev[1] = true;
      prev[2] = false;
      return prev;
    })
    console.log(signInMethods);
  }
  return (
    <div className={styles.container}>
      <div className={styles.form} >
        <div className={styles.heading}>Sign in</div>
        {/* {signInMethods[0] && <SignInWithEmail/>} */}
        {signInMethods[0] && <SignInWithPhone/>}

        
        <div className={styles.iconDiv}>
         <button onClick={useGmail}><FcGoogle /></button> 
         <button onClick={usePhone}><FaMobileAlt /></button> 
        </div>        
      </div>
    </div>
  );
};

export default Login;
