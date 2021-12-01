export const PeepList = ({peeps}) => {

  const renderPeeps = (peeps) => {
    return peeps.map((peep) => {
      let { _id, username, text } = peep;
      return(
        <div id={_id} className='peep_card' key={_id}>
          <h4>{username}</h4>
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