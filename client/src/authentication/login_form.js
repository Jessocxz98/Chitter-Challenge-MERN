import { useState } from 'react';
import { Form } from './form_component'
import { api } from '../axios/api';
import { useCookies } from 'react-cookie'


export const LoginForm = () => {
  const [authError, setAuthError] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['cookie-name'])

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
    ]
  }

  const onSubmit = async (user) => {
    setAuthError('')
    
    try {
      const res = await api.post('/users/login', user);
      console.log(res);
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
      {authError && <span className='auth_error'>{authError}</span>}
    </div>
  )
}