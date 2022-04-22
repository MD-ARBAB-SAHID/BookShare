import styles from "./SignUp.module.css";
import { useState, useContext } from "react";
import SignUpWithEmail from "./SignUpWithEmail/SignUpWithEmail";
import SignUpWithPhone from "../SignInForm/SignInWithPhone/SignInWithPhone";
import { FaMobileAlt } from "react-icons/fa";
import { AiOutlineMail, AiFillGoogleCircle } from "react-icons/ai";
import AuthContext from "../../../store/auth-context";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase-config";

const SignUp = () => {
  const [emailSignIn, setEmailSignIn] = useState(true);
  const [phoneSignIn, setEPhoneSignIn] = useState(false);
  const [googleSignIn, setGoogleSignIn] = useState(false);
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

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
  const useGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential)
      const token = credential.accessToken;
      authCtx.login(credential.idToken, credential.accessToken);
      setIsLoading(false);
    } catch (error) {
        console.log(error.message);
    }
    console.log("first")
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.heading}>Sign up</div>
        {emailSignIn && <SignUpWithEmail />}
        {phoneSignIn && <SignUpWithPhone />}

        <div className={styles.iconDiv}>
          <button onClick={useEmailSignIn}>
            <AiOutlineMail />
          </button>
          <button onClick={usePhoneSignIn}>
            <FaMobileAlt />
          </button>
          <button onClick={useGoogleSignIn}>
            <AiFillGoogleCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
