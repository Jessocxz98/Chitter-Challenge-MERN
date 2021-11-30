import { useState } from 'react';
import { api } from '../axios/api';

const initialState = { text: '', token: document.cookie.replace('user=', '') }

export const PeepForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await api.post('/peeps/', formData)
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name='text' onChange={handleChange} placeholder="What's on your mind?" />
        <input type='submit' value='Peep it' />
      </form>
    </div>
  )
}