import { useRef, useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"];
const randomIdx = Math.floor(Math.random() * 10);
if (randomIdx != 0) {
  [TEXTS[1], TEXTS[randomIdx]] = [TEXTS[randomIdx], TEXTS[1]];
}

function Clock({ fullLoad, setFullLoad }) {
  const [text, setText] = useState("Cambodia");
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [showClock, setShowClock] = useState(false); // New state to control clock visibility
  const textRef = useRef(null);
  const targetIdx = TEXTS.indexOf("Cambodia");

  useEffect(() => {
    const timeClock = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timeClock);
  }, []);

  // Handle text transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex == targetIdx - 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            textRef.current.classList += " motion-preset-blink ";
          }, 1000);

          setTimeout(() => {
            setShowClock(true);
          }, 3000);
          setTimeout(() => {
            setFullLoad(true);
          }, 4000);
        }
        return prevIndex + 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="intro font-bold absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-nowrap z-[-1]">
      {showClock ? (
        <p className="clock">{time.toLocaleTimeString()}</p>
      ) : (
        <div ref={textRef}>
          <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
        </div>
      )}
    </div>
  );
}

export default Clock;
