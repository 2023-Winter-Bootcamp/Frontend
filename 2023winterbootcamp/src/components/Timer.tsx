import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TimerProps {
  elapsedTime?: number;
}

const StyledTimer = styled.div`
  color: white;
  font-size: 20px;
  z-index: 9999;
  position: absolute;
  margin-top: 10px;
  margin-left: -580px;
`;

const Timer: React.FC<TimerProps> = ({ elapsedTime }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [formattedTime, setFormattedTime] = useState("00:00");

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 타이머 자동 시작
    startStopwatch();

    let interval: NodeJS.Timer;

    if (isRunning) {
      interval = setInterval(() => {
        if (elapsedTime !== undefined) {
          const minutes = Math.floor(elapsedTime / 60);
          const seconds = elapsedTime % 60;

          const formattedMinutes = String(minutes).padStart(2, "0");
          const formattedSeconds = String(seconds).padStart(2, "0");

          setFormattedTime(`${formattedMinutes}:${formattedSeconds}`);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  return <StyledTimer>{formattedTime}</StyledTimer>;
};

export default Timer;
