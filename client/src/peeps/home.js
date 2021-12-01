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
    
    checkUserLoggedIn()
  }, [])


  
  return (
    <div>
      { isLoggedIn && <PeepForm /> }
      { peeps && <PeepList peeps={peeps} /> }
    </div>
  )
}