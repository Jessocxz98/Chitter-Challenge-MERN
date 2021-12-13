import { DateTime } from 'luxon';
import imgPlaceholder from '../images/profile_place_holder.jpeg'
export const PeepList = ({ peeps }) => {

  const renderPeeps = (peeps) => {
    return peeps.map((peep) => {
      let { _id, username, text, createdAt } = peep;
      const date = new DateTime.fromISO(createdAt).toFormat('t dd-LL-yy')
      return(
        <div id={_id} className='section peep_card' key={_id}>
          <div className='peep_header'>
            <img className='profile_pic profile_pic_peep' src={imgPlaceholder} alt='Profile' />
            <div className='post_info'>
              <h4>{username}</h4>
              <h6 className='time_stamp'>{date.toLowerCase()}</h6>
            </div>
            
          </div>
          <div className='peep_text'>
            <h4>{text}</h4>
          </div>
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