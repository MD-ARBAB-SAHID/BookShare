import styles from "./GetPhone.module.css";
import { useHistory } from "react-router-dom";
import useInputValidator from "../../../../hooks/auth-form";
import { useEffect ,useState} from "react";
import { auth } from "../../../../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import LoadingSpinner from ".././../../UI/Loading Spinner/LoadingSpinner";
const GetPhone = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const {
    enteredInput: phone,
    enteredInputIsValid: phoneIsValid,
    inputIsInvalid: phoneIsInvalid,
    inputResetHandler: phoneReset,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHanlder: phoneBlurHandler,
    setInitialValue: phoneInitialValue,
  } = useInputValidator((input) => input.length >= 10);

  useEffect(() => {
    phoneInitialValue(props.enteredPhone);
  }, []);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptchaDiv",
      {
        size: "invisible",
        callback: (response) => {
          console.log("verified");
        },
        defaultCountry: "IN",
      },
      auth
    );
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (phone.length >= 12) {
      setIsLoading(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      try {
        const data = await signInWithPhoneNumber(auth, phone, appVerifier);
        window.confirmationResult = data;
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        phoneReset();
        console.log(error.message);
      }
    }
    props.submitPhone(phone);
  };

  let formIsInvalid = true;
  if (phoneIsValid) {
    formIsInvalid = false;
  }
  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      {isLoading && <LoadingSpinner />}
      <div>
        <label htmlFor="email">Phone</label>
        <div className={styles.phone}>
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
      <div id="recaptchaDiv"></div>
    </form>
  );
};
export default GetPhone;
