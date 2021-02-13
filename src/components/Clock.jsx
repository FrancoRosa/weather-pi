import { useEffect, useState } from "react"

const Clock = () => {
  const [currentTime, setCurrentTime] = useState({});
  
  const getTime = () => {
    const now = new Date().toString().split(' ');
    const date = now.splice(0,4).join(' ')
    const time = now[0]
    setCurrentTime( {date, time});
  }

  useEffect(() => {
    getTime();
    setInterval(getTime, 1000);
  },[])
  return(
    <div className="clock">
      <h3 className="title is-3 has-text-link">{currentTime.date}</h3>
      <h3 className="title is-3 has-text-link">{currentTime.time}</h3>
    </div>
  )
}

export default Clock;