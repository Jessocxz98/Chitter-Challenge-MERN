import { DateTime } from 'luxon';

export const PeepList = ({peeps}) => {

  const renderPeeps = (peeps) => {
    return peeps.map((peep) => {
      let { _id, username, text, createdAt } = peep;
      let date = new DateTime(createdAt).toFormat('t dd-LL-yy')
      return(
        <div id={_id} className='peep_card' key={_id}>
          <h4>{username}</h4>
          <span className='time_stamp'>{date}</span>
          <p>{text}</p>
        </div>
      )
    })
  }

  return (
    <div className='peeps_list'>
      {renderPeeps(peeps)}
    </div>
  )
}