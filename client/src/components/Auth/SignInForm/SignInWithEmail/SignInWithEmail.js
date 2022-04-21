import styles from "./SignInWithEmail.module.css";
import { useHistory } from "react-router-dom";
import useInputValidator from "../../../../hooks/auth-form";
const SignInWithEmail = (props) => {
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
        // to be integrated by lord somaditya bindhani
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
  );
};


export default SignInWithEmail;