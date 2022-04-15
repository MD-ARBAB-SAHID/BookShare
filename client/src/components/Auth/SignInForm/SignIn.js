import { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import AuthContext from "../../../store/auth-context";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../UI/Loading Spinner/LoadingSpinner";
import Error from "../../../components/UI/Error/Error";
import useHttp from "../../../hooks/use-http";
import { RiLockPasswordLine } from "react-icons/ri";
import useInputValidator from "../../../hooks/auth-form";
const Login = () => {
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

  
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const signInDetails = {
      email,
      password, 
    };
    try {
      // api call kare
      console.log(email, password);
    } catch(err) {
      emailReset();
      passwordReset();
    }
  };

  let formIsInvalid = true;
  if(emailIsValid && passwordIsValid) {
    formIsInvalid = false;
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <div className={styles.heading}>Sign in</div>
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
          <button onClick={() => {history.push("/signup")}}>or Sign up</button>
      </form>
    </div>
  );
};

export default Login;
