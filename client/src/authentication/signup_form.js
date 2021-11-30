import { useState } from 'react';
import { api } from '../axios/api';
import { Form } from './form_component'
import { useCookies } from 'react-cookie'

export const SignupForm = () => {
  const [cookie, setCookie] = useCookies(['cookie-name']);
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  let template = {
    title: 'Signup',
    fields: [
      {
        title: 'Username',
        type: 'text',
        name: 'username',
        error: usernameError
      },
      {
        title: 'Email',
        type: 'email',
        name: 'email',
        error: emailError
      },
      {
        title: 'Password',
        type: 'password',
        name: 'password'
      },
      {
        title: 'Confirm password',
        type: 'password',
        name: 'confirmPassword',
        error: passwordError
      }
    ],
    submitText: 'Signup'
  }

  const onSubmit = async (user) => {
    const {password, confirmPassword} = user;
    
    if (password !== confirmPassword) return setPasswordError('Passwords do not match, please try again')
    
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    
    try {
      const res = await api.post('/users/signup', user);
      console.log(res);
    }
    catch (err) {
      const errors = err.response.data.split(', ');
      errors.map(error => {
        if (error.startsWith('username:')) return setUsernameError((prevState) => [...prevState, error.replace('username: ', '')]);
        if (error.startsWith('email:')) return setEmailError((prevState) => [...prevState, error.replace('email: ', '')]);
        if (error.startsWith('password:')) return setPasswordError((prevState) => [...prevState, error.replace('password: ', '')]);
      })
    }
  }

  return (
    <div className="section signup_section">
      <Form 
        template={template}
        onSubmit={onSubmit}
      />
    </div>
  );
}
