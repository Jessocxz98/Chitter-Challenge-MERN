import { useState } from 'react';
import { Form } from './form_component';
import { api } from '../axios/api';
import { useCookies } from 'react-cookie'

export const LoginForm = () => {
  const [authError, setAuthError] = useState('');
  const [cookie, setCookie] = useCookies(['cookie-name']);

  let template = {
    title: 'Login',
    fields: [
      {
        title: 'Email',
        type: 'email',
        name: 'email'
      },
      {
        title: 'Password',
        type: 'password',
        name: 'password'
      }
    ],
    submitText: 'Login'
  }

  const onSubmit = async (user) => {
    setAuthError('')
    
    try {
      const res = await api.post('/users/login', user);
      setCookie('user', res.data.token)
      console.log(cookie)
      window.location.href = 'http://localhost:3000/'
    }
    catch (err) {
      setAuthError(err.response.data['message'])
    }

  }

  return (
    <div className="section login_section">
      <Form 
        template={template}
        onSubmit={onSubmit}
      />
    </div>
  )
}