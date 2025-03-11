'use client';

import {RefObject, useRef, useState, useEffect} from "react";
import clsx from "clsx";

export default function BattleUI ({text, time}: {text: string, time: number}) {
  // Health controls
  const health = useRef(3);
  const updateHealth = () => {
    health.current = health.current - 1;
  }

  // User input controls
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    updateWpm();
    updateTotalKeys();
    const currentIndex = e.target.value.length;
    const lastChar =e.target.value[currentIndex - 1];

    if (text[currentIndex - 1] !== lastChar) {
      updateHealth();
    }
    else if (text[currentIndex - 1] === lastChar) {
      updateCorrectKeys();
    }
  }

  // Timer controls
  const [seconds, setSeconds] = useState(time);
  useEffect (() => {
   const timer =
     seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
   return () => clearInterval(timer);
  }, [seconds]);

  // Calculate Accuracy
  const [correctKeys, setCorrectKeys] = useState(0);
  const updateCorrectKeys = () => {

    const correct = correctKeys + 1;
    setCorrectKeys(correct);
  }

  const [totalKeys, setTotalKeys] = useState(0);

  const updateTotalKeys = () => {
    const total = totalKeys + 1;
    setTotalKeys(total);
  }

  // Calculate WPM
  const [wpm, setWpm] = useState(0);

  const updateWpm = () => {
    const words = userInput.split(' ').length;
    const timed = words * 60;
    const wpm = timed / (time - seconds);
    setWpm(wpm);
  }

  // Battle UI
  if (health.current > 0 && userInput.length < text.length && seconds > 0) {
    return (
      <table className={'flex mx-0 my-16 bg-[#f6fbff] w-1/2 h-auto tex-gray-900 justify-center rounded-lg'}>
        <tbody className={'min-w-full p-3'}>
        <tr>
          <td className={'text-gray-900'}>
            Time: {seconds}
          </td>
        </tr>
        <tr className={'my-9 flex justify-center rounded'}>
          <td>
            <div className={'text-2xl tracking-widest'}>
              {text.split("").map((char, index) => {
                let className = "text-gray-400";

                if (index < userInput.length) {
                  className = userInput[index] === char ? "text-green-400" : "bg-red-300";
                }
                if (index === userInput.length) {
                  className += " bg-blue-500 animate-pulse"; // Cursor effect
                }
                return (
                  <span key={index} className={className}>
              {char}
            </span>
                );
              })}
            </div>
          </td>
        </tr>
        <tr className={'my-9 flex justify-center min-w-full p-0'}>
          <td className={'min-w-full'}>
            <input
              className={'bg-[#ffffff] min-w-full text-xl tracking-wide p-2 text-gray-800'}
              type={'text'}
              value={userInput}
              onChange={handleInputChange}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              autoFocus={true}
              placeholder={'Type the above text here when the battle begins!'}
            />
          </td>
        </tr>
        <tr className={'my-9 flex justify-center min-w-full p-0'}>
          <td className={clsx('w-10 h-10 rounded-full mx-1',
            {'bg-blue-500': health.current >= 3, 'bg-red-300': health.current < 3})}
          />
          <td className={clsx('w-10 h-10 rounded-full mx-1',
            {'bg-blue-500': health.current >= 2, 'bg-red-300': health.current < 2})}
          />
          <td className={clsx('w-10 h-10 rounded-full mx-1',
            {'bg-blue-500': health.current >= 1, 'bg-red-300': health.current < 1})}
          />
        </tr>
        </tbody>
      </table>
    );
  }
  // Round Win
  else if(userInput.length === text.length) {
    return (
      <p className={'text-black'}>You Win! Accuracy: {parseFloat((correctKeys / totalKeys * 100).toPrecision(4))}% WPM: {wpm} </p>

    );
  }
  // Round Loss
  else if (health.current <= 0 || seconds === 0) {
    return (
      <p className={'text-black'}>Round Over</p>
    );
  }
}