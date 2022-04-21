import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputReducerFunction = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "INTIALVALUE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return initialState;
  }
};

const useInputValidator = (validateInput) => {
  const [inputState, dispatchFunction] = useReducer(
    inputReducerFunction,
    initialState
  );
  const enteredInputIsValid = validateInput(inputState.value);
  const inputIsInvalid = inputState.isTouched && !enteredInputIsValid;
  
  const setInitialValue = (value) => {
    dispatchFunction({
      type: "INTIALVALUE",
      value,
    })
  }

  const inputChangeHandler = (event) => {
    dispatchFunction({
      type: "INPUT",
      value: event.target.value,
    })
  }

  const inputBlurHanlder = () => {
    dispatchFunction({
      type: "BLUR",
    })
  }

  const inputResetHandler = () => {
    dispatchFunction({
      type: "RESET"
    })
  }

  return {
    enteredInput: inputState.value,
    enteredInputIsValid,
    inputIsInvalid,
    inputResetHandler,
    inputChangeHandler,
    inputBlurHanlder,
    setInitialValue,
  }
};

export default useInputValidator;