import React from "react";
import { useRef } from "react";
import firebase from '../Firebase/Firebase';
const Login = () => {
  const mobileRef = useRef();
  const otpRef = useRef();
  const configCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          submitHandler();
          console.log("verified");
        },
        defaultCountry: "IN",
      }
    );
  };
  const submitHandler = (event) => {
    // event.preventDefault();
    // const mobile = mobileRef.current.value;
    // const otp = otpRef.current.value;
    // console.log(mobile, otp);
    event.preventDefault();
    configCaptcha();
    const phoneNumber = "+91" + mobileRef.current.value;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log('otp has been sent')
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log('sms not send');
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter Mobile:</label>
        <input type="number" ref={mobileRef}></input>
        <label>OTP</label>
        <input type="number" ref={otpRef}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
