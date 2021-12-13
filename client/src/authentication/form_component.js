import { useForm } from 'react-hook-form';

export const Form = ({ template, onSubmit }) => {
  let { register, handleSubmit } = useForm();
  let { title, fields, submitText} = template;

  const renderFields = (fields) => {
    return fields.map(field => {
      let { title, type, name, error } = field;
      return(
        <div key={name} className='input_container'>
          <input type={type} name={name} className='input_field' {...register(`${name}`)} placeholder={title} />
          <br/>
          <span className='input_error'>{error}</span>
        </div>
      )

    })
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className='form auth_form' >
        <h4>{title}</h4>
          {renderFields(fields)}
        <input type='submit' value={submitText} className='btn submit_btn' />
      </form>
  )
}