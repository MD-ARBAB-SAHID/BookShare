import styles from "./GetPhone.module.css";
import { useHistory } from "react-router-dom";
import useInputValidator from "../../../../hooks/auth-form";
import { useEffect } from "react";

const GetPhone = (props) => {
  const history = useHistory();
  const {
    enteredInput: phone,
    enteredInputIsValid: phoneIsValid,
    inputIsInvalid: phoneIsInvalid,
    inputResetHandler: phoneReset,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHanlder: phoneBlurHandler,
    setInitialValue: phoneInitialValue
  } = useInputValidator((input) => input.length === 10);

  useEffect(() => {
    phoneInitialValue(props.enteredPhone);
  }, [])

  // console.log(props.enteredPhone)
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const phoneDetails = {
      phone
    };
    phoneReset();
    props.submitPhone(phoneDetails);
  };

  let formIsInvalid = true;
  if(phoneIsValid) {
    formIsInvalid = false;
  }
  return (
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <div>
          <label htmlFor="email">Phone</label>
          <div className={styles.phone}>
              <div>+91</div>
                <input
                  id="phone"
                  type="phone"
                  value={phone}
                  onChange={phoneChangeHandler}
                  onBlur={phoneBlurHandler}
                />
            </div>
          {phoneIsInvalid && <p>Please enter a valid phone</p>}
        </div>
        
        <div className={styles.button}>
          <button type="submit" disabled={formIsInvalid}>
            Get otp
          </button>
        </div>
      </form>
  );
};
export default GetPhone;