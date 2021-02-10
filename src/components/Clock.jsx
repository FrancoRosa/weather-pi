import { useEffect, useState } from "react"

const Clock = () => {
  const [currentTime, setCurrentTime] = useState('');
  
  const getTime = () => {
    const now = new Date().toString();
    setCurrentTime(now);
  }

  useEffect(() => {
    getTime();
    setInterval(getTime, 1000);
  },[])
  return(
    <p className="weather__container">{currentTime}</p>
  )
}

export default Clock;