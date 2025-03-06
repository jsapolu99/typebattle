'use client';
import Navbar from "@/app/ui/navbar";
import Link from "next/link";
import { useState, useRef } from "react";
import clsx from "clsx";

export default function Battle() {
  const [userInput, setUserInput] = useState('');
  const currentIndex = userInput.length;
  // Sets initial health to 3
  const health = useRef(3);

  // Decreases health by 1
  const updateHealth = () => {
    health.current = health.current - 1;
  }

  const sampleText = 'Filler text for now! But what if it was a shit ton of text like this would it still possible look good on that format idk so that is what we are aiming to find out';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }
  return (
    <main className={'bg-[#eeeeee] min-h-screen'}>
      <Navbar/>
      <div className={'flex justify-center'}>
        <table className={'flex mx-0 my-16 bg-[#f6fbff] w-1/2 h-auto text-gray-900 justify-center rounded-lg'}>
          <tbody className={'min-w-full p-3'}>
          <tr className={'content-end'}>
            <td>timer</td>
          </tr>
          {/* Text Field */ }
          <tr className={'my-9 flex justify-center rounded'}>
            <td>
              <div className={'text-2xl tracking-widest'}>
                {sampleText.split("").map((char, index) => {
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
          {/* Input Field */ }
          <tr className={'my-9 flex justify-center min-w-full p-0'}>
            <td className={'min-w-full'}>
              <input
                className={'bg-[#ffffff] min-w-full text-xl tracking-wide p-2'}
                type={'text'}
                value={userInput}
                onChange={handleInputChange}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                autoFocus={true}
                placeholder={'Type the above text here when the battle begins!'}
              />
            </td>
          </tr>
          {/* Health Bar */ }
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
      </div>
    </main>
  );
}
