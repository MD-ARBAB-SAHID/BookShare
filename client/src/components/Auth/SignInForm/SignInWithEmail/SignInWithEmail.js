import styles from "./SignInWithEmail.module.css";
import { useHistory } from "react-router-dom";
import useInputValidator from "../../../../hooks/auth-form";
import { auth } from "../../../../firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import AuthContext from "../../../../store/auth-context";
import LoadingSpinner from "../../../UI/Loading Spinner/LoadingSpinner";
const SignInWithEmail = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {
    enteredInput: email,
    enteredInputIsValid: emailIsValid,
    inputIsInvalid: emailIsInvalid,
    inputResetHandler: emailReset,
    inputChangeHandler: emailChangeHandler,
    inputBlurHanlder: emailBlurHandler,
  } = useInputValidator((input) => input.includes("@"));

  const {
    enteredInput: password,
    enteredInputIsValid: passwordIsValid,
    inputIsInvalid: passwordIsInvalid,
    inputResetHandler: passwordReset,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHanlder: passwordBlurHandler,
  } = useInputValidator((input) => input.length >= 8);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data = await signInWithEmailAndPassword(auth, email, password);
      const authData = data._tokenResponse;
      authCtx.login(authData.authToken, authData.localId);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      emailReset();
      passwordReset();
    }
  };

  let formIsInvalid = true;
  if (emailIsValid && passwordIsValid) {
    formIsInvalid = false;
  }
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailIsInvalid && <p>Please enter a valid email</p>}
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordIsInvalid && <p>Please use the correct password</p>}
        </div>

        <div className={styles.button}>
          <button type="submit" disabled={formIsInvalid}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInWithEmail;
