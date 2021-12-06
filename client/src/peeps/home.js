import { useState, useEffect } from "react";
import { PeepForm } from './peep_form.js';
import { PeepList } from "./render_peeps"

export const Home = () => {
  const [peeps, setPeeps] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      if (document.cookie.length > 0) return setIsLoggedIn(true);
    }

    // Need to set this as a webhook to subscribe to updates on my api, for now this is ok
    setTimeout(() => {
      fetch('http://localhost:5000/peeps/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPeeps(data)
      })
      .catch(err => {
        console.log(err)
      })
    }, 1000)

    checkUserLoggedIn()
  }, [peeps])


  
  return (
    <div>
      { isLoggedIn && <PeepForm /> }
      { peeps && <PeepList peeps={peeps} /> }
    </div>
  )
}