import styles from "./SignUp.module.css";
import { useState } from "react";
import SignUpWithEmail from "./SignUpWithEmail/SignUpWithEmail";
import SignUpWithPhone from "../SignInForm/SignInWithPhone/SignInWithPhone";
import { FcGoogle } from "react-icons/fc";
import { FaMobileAlt } from "react-icons/fa";

const SignUp = () => {
  const [emailSignIn, setEmailSignIn] = useState(true);
  const [phoneSignIn, setEPhoneSignIn] = useState(false);
  const [googleSignIn, setGoogleSignIn] = useState(false);

  const useEmailSignIn = () => {
    setEmailSignIn(true);
    setEPhoneSignIn(false);
    setGoogleSignIn(false);
  };
  const usePhoneSignIn = () => {
    setEmailSignIn(false);
    setEPhoneSignIn(true);
    setGoogleSignIn(false);
  };
  const useGoogleSignIn = () => {
    setEmailSignIn(false);
    setEPhoneSignIn(false);
    setGoogleSignIn(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.heading}>Sign up</div>
        {emailSignIn && <SignUpWithEmail />}
        {phoneSignIn && <SignUpWithPhone />}

        <div className={styles.iconDiv}>
          {!googleSignIn && (
            <button onClick={useGoogleSignIn}>
              <FcGoogle />
            </button>
          )}
          {!phoneSignIn && (
            <button onClick={usePhoneSignIn}>
              <FaMobileAlt />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
