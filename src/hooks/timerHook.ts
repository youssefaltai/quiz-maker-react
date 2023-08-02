import { useState, useEffect } from 'react';

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  const startTimer = (initialTime: number) => {
    setSeconds(initialTime);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return {
    seconds,
    isActive,
    startTimer,
    stopTimer,
  };
};

export default useTimer;
