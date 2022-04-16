import styles from "./SignUp.module.css";
import { useState } from "react";
import SignUpWithEmail from "./SignUpWithEmail/SignUpWithEmail";
import SignUpWithPhone from "../SignInForm/SignInWithPhone/SignInWithPhone";
import { FcGoogle } from "react-icons/fc"
import { FaMobileAlt } from "react-icons/fa"

const SignUp = () => {
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
      <div className={styles.form}>
        <div className={styles.heading}>Sign up</div>

        {signInMethods[0] && <SignUpWithEmail/>}
        {signInMethods[1] && <SignUpWithPhone/>}
        <div className={styles.iconDiv}>
          <button onClick={useGmail}>
            <FcGoogle />
          </button>
          <button onClick={usePhone}>
            <FaMobileAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
