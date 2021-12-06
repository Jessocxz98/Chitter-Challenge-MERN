import { useState } from "react";
import { SignupForm } from "./signup_form";
import { LoginForm } from "./login_form";

export const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);

  let buttonMessage = (isLogin) ? "Don't have an account? Signup" : 'Already have an account? Login';

  return (
    <div className='section form_container'>
      {(isLogin) ? <LoginForm /> : <SignupForm />}
      <button onClick={() => setIsLogin(!isLogin)} className='btn switch_btn'>{buttonMessage}</button>
    </div>
  )
}