'use client';
import React, { useEffect } from "react";
import type { GameProps, Player, GameStatus, PlayerScore } from "../../../../server/types/types";
import { useState } from "react";
import {Socket, io} from "socket.io-client";
import LeaderboardCard from "@/components/ui/leaderboard-card";
import { Button } from "@/components/ui/button";
import Navbar from "@/app/ui/navbar";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Slider} from "@/components/ui/slider";
import {toast} from "sonner";
import Confetti from 'react-confetti';


export default function Game({ gameId, name }: GameProps) {
  const [ioInstance, setIoInstance] = useState<Socket>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('not-started');
  const [paragraph, setParagraph] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [inputParagraph, setInputParagraph] = useState<string>('');
  const [time, setTime] = useState<number>(60000);
  const [textLength, setTextLength] = useState<number>(100);
  const [seconds, setSeconds] = useState(time / 1000);
  const [windowSize] = useState({width: undefined, height: undefined});
  const [count, setCount] = useState(3);
  const [showUi, setShowUi] = useState(false);

  useEffect(() => {
    /* ********************* CHANGE THE HARD CODED URL LATER ********************************* */
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
      transports: ["websocket"],
    })


    setIoInstance(socket);

    socket.emit('join-game', gameId, name);

    return () => {
      removeListeners();
      socket.disconnect();
    }
  }, []);


  useEffect(() => {
    if (!ioInstance || gameStatus !== "in-progress") return;
    if (seconds <= 0) return;
       setTimeout(() => {
        setSeconds((prev) => prev - 1);
      },1000);
  })





  useEffect(() => {
    setupListeners();
    return () => removeListeners();
  }, [ioInstance]);

  useEffect(() => {
    if (!ioInstance || gameStatus !== 'in-progress') return;

    ioInstance.emit('player-typed', inputParagraph);

  }, [inputParagraph]);

  function setupListeners() {
    if(!ioInstance) return;

    ioInstance.on('connect', () => {
      console.log('Connected to server');
    })

    ioInstance.on('players', (players: Player[]) => {
      console.log('received players');
      setPlayers(players);
    });

    ioInstance.on('player-joined', (player: Player) => {
      setPlayers((prev) => [...prev, player]);
    });

    ioInstance.on('player-left', (id: string) => {
      setPlayers((prev) => prev.filter((player) => player.id !== id));
    });

    ioInstance.on('player-score', ({id, score}: PlayerScore) => {
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.id === id) {
            return {
              ...player,
              score,
            };
          }
          return player;
        }),
      );
    });

    ioInstance.on('game-started', (paragraph: string, time: number) => {
      setParagraph(paragraph);
      setTime(time);
      setSeconds(time / 1000);
      setGameStatus('in-progress');
    });

    ioInstance.on('game-finished', () => {
      setGameStatus('finished');
      setInputParagraph('');
    });

    ioInstance.on('player-finished', () => {
      ioInstance.emit('end-game');
      console.log('game ended because player finished');
    })

    ioInstance.on('new-host', (id: string) => {
      setHost(id);
    });

    ioInstance.on('error', (message: string) => {
      toast(message);
    })

    ioInstance.on('start-countdown', () => {
      setShowUi(true);
      const countdownValue = 3;
      setCount(countdownValue);
      const countdown = setInterval(() => {
        setCount((prev) => {
          if (prev === 1) {
            clearInterval(countdown); // Stop countdown when reaching 0

            setShowUi(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    })
  }



  function removeListeners() {
    if (!ioInstance) return;

    ioInstance.off('connect');
    ioInstance.off('players');
    ioInstance.off('player-joined');
    ioInstance.off('player-left');
    ioInstance.off('player-score');
    ioInstance.off('game-started');
    ioInstance.off('game-finished');
    ioInstance.off('new-host');
    ioInstance.off('error');
    ioInstance.off('player-error');
    ioInstance.off('start-countdown');
    ioInstance.off('player-finished');
    ioInstance.off('end-game');
  }

  function startGame() {
    if (!ioInstance) return;
    ioInstance.emit('start-game', time, textLength); // Emit event after 3s
  }

  window.onbeforeunload = () => {
    if (ioInstance) {
      ioInstance.emit('leave');
    }
  };

  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(gameId)
    } catch (e) {
      console.error('Failed to copy invite code', e);
    }

  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;

    if (key === 'Backspace') return;

    const currentLength = inputParagraph.length;

    if ( currentLength > 0 && inputParagraph !== paragraph.slice(0, currentLength)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div>
      <Navbar />
    <div className={'w-screen p-10 grid grid-cols-1 lg:grid-cols-3 gap-10'}>
      {/* Leaderboard */}
      <div className={'w-full order-last lg:order-first'}>
        <h2 className={'text-2xl font-medium mb-10 mt-10 lg:mt-0'}>Leaderboard</h2>
        <div className={'flex flex-col gap-5 w-full'}>
          {/* Sort players based on score and map */}
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <LeaderboardCard
                key={player.id}
                player={player}
                rank={index + 1}
              />
            ))}
        </div>
      </div>

      {/*Game */}
      <div className={'lg:col-span-2 h-full'}>
        {gameStatus === 'not-started' && (
          <div className={'flex flex-col items-center justify-center p-10'}>
            {!showUi && <h1 className={'text-2xl font-bold'}>Waiting for players to join...</h1>}
            {showUi && (
              <div className={'flex justify-center'}>
                <h1 className={'text-2xl font-bold'}>{'Game Starting in: ' + count }</h1>
              </div>
            )}
            {host === ioInstance?.id && (
              <div>
                <Button className={'mt-10 px-20'}onClick={startGame}>
                  Start Game
                </Button>
                <Card className={'my-3'}>
                  <CardHeader>Match Settings:</CardHeader>
                  <CardContent>
                    <p>Invite Code: {gameId}</p>
                    <Button className={'mt-1'} onClick={copyInvite}>Copy</Button>
                    <div className={'my-8'}>
                    <form>
                      <div className={'grid-cols-4'}>
                        <h2>Time:</h2>
                        <ToggleGroup
                          type={'single'}
                          variant={'outline'}
                          defaultValue={time}
                          onValueChange={(value) => setTime(value)}
                        >
                          <ToggleGroupItem value={30000}>30s</ToggleGroupItem>
                          <ToggleGroupItem value={60000}>60s</ToggleGroupItem>
                          <ToggleGroupItem value={90000}>90s</ToggleGroupItem>
                          <ToggleGroupItem value={120000}>120s</ToggleGroupItem>
                        </ToggleGroup>
                        <div className={'py-2'}>
                          <h2>Text Length:</h2>
                          <div className={'py-2'}>
                            <Label>{textLength} words</Label>
                            <Slider
                              className={'my-2'}
                              defaultValue={[textLength]}
                              max={200}
                              min={50}
                              step={1}
                              onValueChange={(value) => setTextLength(value[0])}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                    </div>
                  </CardContent>

                </Card>
              </div>
            )}
          </div>
        )}
        {/* Actual Game UI only shown when gameStatus is in progress */}
        {gameStatus === 'in-progress' && (
          <div className={'h-full'}>
            <h1 className={'text-2xl font-bold mb-10'}>Type the paragraph below</h1>
            <div className={'relative h-full'}>
              <Card>
                <CardHeader>
                  <Label>{seconds}</Label>
                </CardHeader>
                <CardContent>
                  <div className={'text-2xl tracking-widest'}>
                    {paragraph.split("").map((char, index) => {
                      let className = "text-gray-400";

                      if (index < inputParagraph.length) {
                        className = inputParagraph[index] === char ? "text-green-400" : "bg-red-300";
                      }
                      if (index === inputParagraph.length) {
                        className += " bg-blue-500 animate-pulse"; // Cursor effect
                      }
                      return (
                        <span key={index} className={className}>
              {char}
            </span>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <textarea
                    className={'bg-[#ffffff] min-w-full text-2xl tracking-wide p-2 text-gray-800'}
                    value={inputParagraph}
                    onChange={(e) => setInputParagraph(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onKeyDown={handleKeyDown}
                    placeholder={''}
                    autoFocus={true}
                    disabled={gameStatus !== 'in-progress' || !ioInstance}
                  />
                </CardFooter>
              </Card>

            </div>
          </div>
        )}

        {gameStatus === 'finished' && (
          <div>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={100}
            />

            <h1>
              {!showUi && 'Round Finished!'}

              {ioInstance?.id === host && !showUi && ' Start the next round or edit the settings below'}
              {ioInstance?.id !== host && !showUi && ' Waiting for host to start the next round'}
            </h1>
            {showUi && (
              <div className={'flex justify-center'}>
                <h1 className={'text-2xl font-bold'}>{'Game Starting in: ' + count }</h1>
              </div>
            )}
            {host === ioInstance?.id && (
              <div>
                <Button className={'mt-10 px-20'} onClick={startGame}>
                  Start Next Round!
                </Button>
                <Card className={'my-3'}>
                  <CardHeader>Match Settings:</CardHeader>
                  <CardContent>
                    <p>Invite Code: {gameId}</p>
                    <Button className={'mt-1'} onClick={copyInvite}>Copy</Button>
                    <div className={'my-8'}>
                      <form>
                        <div className={'grid-cols-4'}>
                          <h2>Time:</h2>
                          <ToggleGroup
                            type={'single'}
                            variant={'outline'}
                            defaultValue={time}
                            onValueChange={(value) => setTime(value)}
                          >
                            <ToggleGroupItem value={30000}>30s</ToggleGroupItem>
                            <ToggleGroupItem value={60000}>60s</ToggleGroupItem>
                            <ToggleGroupItem value={90000}>90s</ToggleGroupItem>
                            <ToggleGroupItem value={120000}>120s</ToggleGroupItem>
                          </ToggleGroup>
                          <div className={'py-2'}>
                            <h2>Text Length:</h2>
                            <div className={'py-2'}>
                              <Label>{textLength} words</Label>
                              <Slider
                                className={'my-2'}
                                defaultValue={[textLength]}
                                max={200}
                                min={50}
                                step={1}
                                onValueChange={(value) => setTextLength(value[0])}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </CardContent>

                </Card>
              </div>

            )}
          </div>
          )}
      </div>
    </div>
    </div>
  );
}