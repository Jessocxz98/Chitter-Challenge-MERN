import { useState } from 'react'
import api from '../axios/api';
import { ValidUsername, ValidEmail, ValidPassword } from './validation'

export const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const [ usernameError, setUsernameError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (ValidUsername(username) !== true ) return setUsernameError(ValidUsername(username));
    if (ValidEmail(email) !== true ) return setEmailError(ValidEmail(email));
    if (ValidPassword(password, verifyPassword) !== true ) return setPasswordError(ValidPassword(password));

    const user = { username, email, password };

    const postData = async () => {
      try {
        const res = await api.post('/users/signup', user)
        console.log(res)
        return res
      }
      catch (err) {
        console.log(err)
      }
    }
    postData();
  }

  return (
    <div className="signup_section">
      <h2 className="title">Signup</h2>
      <form action='POST' className="signup_form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        { usernameError && <p className='validation_error'>{usernameError}</p> }
        <label>Email:</label>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        { emailError && <p className='validation_error'>{emailError}</p> }
        <label>Password:</label>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Verify password:</label>
        <input
          type="password"
          onChange={(e) => setVerifyPassword(e.target.value)}
          required 
        />
        { passwordError && <p className='validation_error'>{passwordError}</p> }
        <input 
          type="submit" 
          value='Signup'
        />
      </form>
    </div>
  );
}
