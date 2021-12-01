import { useState, useEffect } from "react";
import { PeepForm } from './peep_form.js';
import { PeepList } from "./render_peeps"

export const Home = () => {
  const [peeps, setPeeps] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/peeps/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data)
        setPeeps(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  
  return (
    <div>
      <PeepForm />
      { peeps && <PeepList peeps={peeps} /> }
    </div>
  )
}