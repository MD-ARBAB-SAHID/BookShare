import { useContext, useState } from "react";
import styles from "./SignUpWithEmail.module.css";
import { useHistory } from "react-router-dom";
import useInputValidator from "../../../../hooks/auth-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase-config";
import AuthContext from "../../../../store/auth-context";
import LoadingSpinner from "../../../UI/Loading Spinner/LoadingSpinner";
const SignUpWithEmail = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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

  const {
    enteredInput: cpassword,
    enteredInputIsValid: cpasswordIsValid,
    inputIsInvalid: cpasswordIsInvalid,
    inputResetHandler: cpasswordReset,
    inputChangeHandler: cpasswordChangeHandler,
    inputBlurHanlder: cpasswordBlurHandler,
  } = useInputValidator((input) => input === password);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (password === cpassword) {
      try {
        setIsLoading(true);
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(data);
        const authData = data._tokenResponse;
        authCtx.login(authData.authToken, authData.localId);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        emailReset();
        passwordReset();
        cpasswordReset();
        console.log(err.message);
      }
    } else {
      console.log("passwrd match hauni");
    }
  };

  let formIsInvalid = true;
  if (emailIsValid && passwordIsValid && cpasswordIsValid) {
    formIsInvalid = false;
  }
  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div>
        {isLoading && <LoadingSpinner />}
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
      <div>
        <label htmlFor="email">Confirm Password</label>
        <input
          id="cpassword"
          type="password"
          value={cpassword}
          onChange={cpasswordChangeHandler}
          onBlur={cpasswordBlurHandler}
        />
        {cpasswordIsInvalid && <p>password is not same</p>}
      </div>
      <div className={styles.button}>
        <button type="submit" disabled={formIsInvalid}>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpWithEmail;
