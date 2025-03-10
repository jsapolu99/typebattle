'use client';

import {RefObject, useRef, useState, useEffect} from "react";
import clsx from "clsx";

export default function BattleUI ({text, time}: {text: string, time: number}) {
  const health = useRef(3);

  const [userInput, setUserInput] = useState('');
  const [seconds, setSeconds] = useState(time);
  const [status, setStatus] = useState(false);

  useEffect (() => {
   const timer =
     seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
   return () => clearInterval(timer);
  }, [seconds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }
  // Decreases health by 1
  const updateHealth = () => {
    health.current = health.current - 1;
  }

  const currentIndex = userInput.length;

  if (health.current > 0 && currentIndex < text.length && seconds > 0) {
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

                if (index < currentIndex) {
                  className = userInput[index] === char ? "text-green-400" : "bg-red-300";
                  if (className === 'bg-red-300') {
                    updateHealth();
                    console.log(health);
                    if (health.current <= 0) {
                      console.log('Game Over');
                    }
                  }
                }
                if (index === currentIndex) {
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
  else if(currentIndex === text.length) {
    return (
      <p className={'text-black'}>You Win!</p>
    );
  }
  else if (health.current <= 0 || seconds === 0) {
    return (
      <p className={'text-black'}>Round Over</p>
    );
  }
}