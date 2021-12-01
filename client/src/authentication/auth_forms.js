import { useState } from "react";
import { SignupForm } from "./signup_form";
import { LoginForm } from "./login_form";

export const AuthForms = () => {
  const [isSignup, setIsSignUp] = useState(true);

  let buttonMessage = (isSignup) ? 'Already have an account? Login' : "Don't have an account? Login"

  return (
    <div>
      {(isSignup) ? <SignupForm /> : <LoginForm />}
      <button onClick={() => setIsSignUp(!isSignup)}>{buttonMessage}</button>
    </div>
  )
}