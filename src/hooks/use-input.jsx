import { useReducer } from "react"

const initialInputState = {
  value: "",
  isTouched: false,
}

const inputStateReducer = (prevstate, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: prevstate.isTouched }
  }
  if (action.type === "BLUR") {
    return {
      value: prevstate.value,
      isTouched: true,
    }
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false }
  }
  return inputStateReducer
}

const useInput = (validateValue) => {
  // const [enteredValue, setEnteredValue] = useState("")
  // const [isTouched, setIsTouched] = useState(false)

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  )

  // const enteredValueIsValid = validateValue(enteredValue)
  // const hasError = !enteredValueIsValid && isTouched
  const enteredValueIsValid = validateValue(inputState.value)
  const hasError = !enteredValueIsValid && inputState.isTouched

  const ValueInputChangeHandler = (event) => {
    dispatch({
      type: "INPUT",
      value: event.target.value,
    })
    // setEnteredValue(event.target.value)
  }

  const InputBlurHandler = (event) => {
    dispatch({
      type: "BLUR",
    })
    // setIsTouched(true)
  }

  const resetInput = () => {
    dispatch({
      type: "RESET",
    })
    // setEnteredValue("")
    // setIsTouched(false)
  }
  return {
    value: inputState.value,
    isValid: enteredValueIsValid,
    hasError,
    ValueInputChangeHandler,
    InputBlurHandler,
    resetInput,
  }
}

export default useInput
