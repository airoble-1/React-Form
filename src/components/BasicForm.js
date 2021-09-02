import useInput from "../hooks/use-input"

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    ValueInputChangeHandler: firstNameInputChangeHandler,
    InputBlurHandler: firstNameInputBlurHandler,
    resetInput: resetFirstNameInput,
  } = useInput((value) => value.trim())

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    ValueInputChangeHandler: lastNameInputChangeHandler,
    InputBlurHandler: lastNameInputBlurHandler,
    resetInput: resetLastNameInput,
  } = useInput((value) => value.trim())

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    ValueInputChangeHandler: emailInputChangeHandler,
    InputBlurHandler: emailInputBlurHandler,
    resetInput: resetEmailInput,
  } = useInput((value) => value.includes("@"))

  const firstNameInputClass = firstNameInputHasError
    ? "form-control invalid"
    : "form-control"

  const lastNameInputClass = lastNameInputHasError
    ? "form-control invalid"
    : "form-control"

  const emailInputClass = emailInputHasError
    ? "form-control invalid"
    : "form-control"

  let formIsValid = false

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    resetFirstNameInput()
    resetLastNameInput()
    resetEmailInput()
  }
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameInputClass}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError ? (
            <p className="error-text">Fill in first name</p>
          ) : (
            ""
          )}
        </div>
        <div className={lastNameInputClass}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
          />
          {lastNameInputHasError ? (
            <p className="error-text">Fill in last name</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={emailInputClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError ? (
          <p className="error-text">Email is invalid</p>
        ) : (
          ""
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicForm
