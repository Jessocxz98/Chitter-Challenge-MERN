import { Form } from './form_component'
import PostLoginData from '../axios/api';
import Cookies from 'react-cookie'

export const LoginForm = () => {

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

  const onSubmit = (user) => {
    PostLoginData('/users/login', user);
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