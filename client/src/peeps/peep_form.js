import { useState } from 'react';
import { Api } from '../axios/api';

const initialState = { text: null, userId: document.cookie.replace('user=', '') }

export const PeepForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState('')

  const handleChange = (e) => {
    (e.target.value.length === 0) ? setDisableButton(true) : setDisableButton(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    if (formData.text === null || formData.text.trim() === '' ) {
      e.target.reset()
      return setError('Please enter some text')
    }

    try {
      await Api.post('/peeps/', formData, { withCredentials: true })
      setFormData(initialState);
      e.target.reset();
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='section peep_form_section'>
      <form onSubmit={handleSubmit} className='form peep_form'>
        <textarea name='text' type='text' onChange={handleChange} placeholder="What's on your mind?" className='textarea'/>
        <span className='input_error'>{error}</span>
        <input type='submit' value='Peep it' disabled={disableButton} className='btn submit_btn'/>
      </form>
    </div>
  )
}