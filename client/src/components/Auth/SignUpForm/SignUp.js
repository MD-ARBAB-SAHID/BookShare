import styles from "./SignUp.module.css";
import { useHistory } from "react-router-dom"
import useInputValidator from "../../../hooks/auth-form";

const SignUp = () => {
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

  const {
    enteredInput: cpassword,
    enteredInputIsValid: cpasswordIsValid,
    inputIsInvalid: cpasswordIsInvalid,
    inputResetHandler: cpasswordReset,
    inputChangeHandler: cpasswordChangeHandler,
    inputBlurHanlder: cpasswordBlurHandler,
  } = useInputValidator((input) => input === password);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const signInDetails = {
      email,
      password, 
      cpassword
    };
    try {
      // api call kare
    } catch(err) {
      emailReset();
      passwordReset();
      cpasswordReset();
    }
  };

  let formIsInvalid = true;
  if(emailIsValid && passwordIsValid && cpasswordIsValid) {
    formIsInvalid = false;
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <div className={styles.heading}>Sign up</div>
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
          <button onClick={() => {history.push("/login")}}>or Login</button>
      </form>
    </div>
  );
};

export default SignUp;
