import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import classNames from "classnames";

const Timer = ({isRunning, time, setTime, classWrapper}) => {
  const timeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timeRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timeRef.current);
    }

    return () => {
      clearInterval(timeRef.current);
    };
  }, [isRunning]);

  

  
  return <div className={classNames(css.timer__wrapper, [classWrapper])}><span>{time <10? '0' + time : time}</span></div>;
};

export default Timer;
