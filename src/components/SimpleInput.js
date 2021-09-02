import useInput from "../hooks/use-input"

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    ValueInputChangeHandler: nameInputChangeHandler,
    InputBlurHandler: nameInputBlurHandler,
    resetInput: resetNameInput,
  } = useInput((value) => value.trim() !== "")

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    ValueInputChangeHandler: emailInputChangeHandler,
    InputBlurHandler: emailInputBlurHandler,
    resetInput: resetEmailInput,
  } = useInput((value) => {
    const mailFormat = /\S+@\S+\.\S+/
    return value.match(mailFormat)
  })

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetNameInput()
    resetEmailInput()
  }

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control"

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control"

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">You have entered an invalid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput
