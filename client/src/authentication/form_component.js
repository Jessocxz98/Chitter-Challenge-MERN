import { useForm } from 'react-hook-form';

export const Form = ({ template, onSubmit }) => {
  let { register, handleSubmit } = useForm();
  let { title, fields, submitText, error } = template;

  const renderFields = (fields) => {
    return fields.map(field => {
      let { title, type, name, error } = field;
      return(
        <div key={name}>
          <label htmlFor={name}>{title}</label>
          <input type={type} name={name} className='input_field' {...register(`${name}`)} />
          <br/>
          <span className='input_error'>{error}</span>
        </div>
      )

    })
  }

  return (
    <div className='section form_section' >
      <form onSubmit={handleSubmit(onSubmit)} className='form' >
        <h4>{title}</h4>
          {renderFields(fields)}
          {error && <span>{error}</span>}
        <input type='submit' value={submitText} />
      </form>
    </div>
  )
}