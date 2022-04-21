import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import GetPhone from "./GetPhone";
import GetOtp from "./GetOtp";
import AuthContext from "../../../../store/auth-context";
import LoadingSpinner from ".././../../UI/Loading Spinner/LoadingSpinner";
const SignInWithPhone = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const setPhoneHandler = (phone) => {
    setPhone(phone);
    setShowOtp(true);
  };
  const changePhoneHandler = () => {
    setShowOtp(false);
  };

  const getOtpHandler = async (otpDetails) => {
    const enteredOTP = otpDetails.otp;
    if (enteredOTP.length === 6) {
      let confirmationResult = window.confirmationResult;
      try {
        setIsLoading(true);
        const data = await confirmationResult.confirm(enteredOTP);
        // console.log(data)
        const authData = data._tokenResponse;
        authCtx.login(authData.authToken, authData.localId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    } else {
      console.log("enter correct otp");
      return;
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!showOtp && (
        <GetPhone setPhone={setPhone}submitPhone={setPhoneHandler} enteredPhone={phone} />
      )}
      {showOtp && (
        <GetOtp submitOtp={getOtpHandler} changePhone={changePhoneHandler} />
      )}
    </>
  );
};
export default SignInWithPhone;
