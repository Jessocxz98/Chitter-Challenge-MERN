import { useState } from 'react';
import { Form } from './form_component';
import { Api } from '../axios/api'
import { useCookies } from 'react-cookie'

export const LoginForm = () => {
  const [authError, setAuthError] = useState('');
  // eslint-disable-next-line
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
    submitText: 'Login',
    error: authError
  }

  const onSubmit = async (user) => {
    setAuthError('')
    
    try {
      const res = await Api.post('/api/users/login', user, { withCredentials: true });
      setCookie('user', res.data.id)
      window.location.href = (process.env.NODE_ENV === 'production') ? `${process.env.PUBLIC_URL}` : 'http://localhost:3000';
    }
    catch (err) {
      console.log(err.response)
      setAuthError(err.response.data['message'])
    }

  }

  return (
    <div className="login_section">
      <Form 
        template={template}
        onSubmit={onSubmit}
      />
    </div>
  )
}