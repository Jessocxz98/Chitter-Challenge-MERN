import { useState, useEffect } from 'react';
import { Form } from './form_component'
import { PostData, api } from '../axios/api';
import { useCookies } from 'react-cookie'


export const LoginForm = () => {
  const [apiError, setApiError] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['cookie-name'])

  useEffect(() => {

  }, [])

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
    const res = await PostData('/users/login', user);
    if (!res) return setApiError("Incorrect email or password");
    setCookie('jwt', res.data.user)
  }

  return (
    <div className="section login_section">
      <Form 
        template={template}
        onSubmit={onSubmit}
      />
      {apiError && <span className='auth_error'>{apiError}</span>}
    </div>
  )
}