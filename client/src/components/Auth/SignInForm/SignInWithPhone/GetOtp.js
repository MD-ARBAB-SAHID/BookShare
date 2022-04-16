import styles from "./GetOtp.module.css";
import { useHistory } from "react-router-dom";
import useInputValidator from "../../../../hooks/auth-form";

const GetOtp = (props) => {
  const history = useHistory();
  const {
    enteredInput: otp,
    enteredInputIsValid: otpIsValid,
    inputIsInvalid: otpIsInvalid,
    inputResetHandler: otpReset,
    inputChangeHandler: otpChangeHandler,
    inputBlurHanlder: otpBlurHandler,
  } = useInputValidator((input) => input.length >= 4);
  
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const otpDetails = {
      otp
    };
    props.submitOtp(otpDetails);
  };
  const changePhoneHandler = () => {
      props.changePhone();
  }
  let formIsInvalid = true;
  if(otpIsValid) {
    formIsInvalid = false;
  }
  return (
      <form onSubmit={formSubmitHandler} className={styles.form}>
         <div>
          <label htmlFor="email">Enter otp</label>
          <input
            id="otp"
            type="otp"
            value={otp}
            onChange={otpChangeHandler}
            onBlur={otpBlurHandler}
          />
          {otpIsInvalid && <p>Please enter a valid otp</p>}
        </div>
        <div className={styles.button}>
          <button type="submit" disabled={formIsInvalid}>
           submit
          </button>
        </div>
        <div onClick={changePhoneHandler}>Change phone number</div>
      </form>
  );
};
export default GetOtp;