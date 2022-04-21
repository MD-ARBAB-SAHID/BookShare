import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import GetPhone from "./GetPhone";
import GetOtp from "./GetOtp";

const SignInWithPhone = (props) => {
  const history = useHistory();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  
  const setPhoneHandler = (phoneDetails) => {
      setPhone(phoneDetails.phone);
      // api call to post phone
      setShowOtp(true);
    };
    const changePhoneHandler = () => {
    setShowOtp(false);
  };
//   console.log(otp);
  const getOtpHandler = (otpDetails) => {
    console.log(phone);
    console.log(otpDetails);
    setOtp(otpDetails.otp);
    // verify otp
    // redirect
  };
  return (
    <>
      {!showOtp && (
        <GetPhone submitPhone={setPhoneHandler} enteredPhone={phone} />
      )}
      {showOtp && (
        <GetOtp submitOtp={getOtpHandler} changePhone={changePhoneHandler} />
      )}
    </>
  );
};
export default SignInWithPhone;
