import { useForm } from 'react-hook-form';

export const Form = ({ template, onSubmit }) => {
  let { register, handleSubmit } = useForm();
  let { title, fields } = template;

  const renderFields = (fields) => {
    return fields.map(field => {
      let { title, type, name } = field;
      return(
        <div key={name}>
          <label htmlFor={name}>{title}</label>
          <input type={type} name={name} className='input_field' {...register(`${name}`)} />
        </div>
      )

    })
  }

  return (
    <div className='section form_section' >
      <form onSubmit={handleSubmit(onSubmit)} className='form' >
        <h4>{title}</h4>
          {renderFields(fields)}
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}