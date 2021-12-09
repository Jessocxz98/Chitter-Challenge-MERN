import { useState, useEffect } from "react";
import { Api } from '../axios/api'
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
    const getPeeps = async () => {
      try {
        const res = await Api.get('/peeps/');
        console.log(res.data)
        return setPeeps(res.data)
      }
      catch (err) {
        console.log(err)
      }
  
    }
    setTimeout(() => {
      getPeeps()
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