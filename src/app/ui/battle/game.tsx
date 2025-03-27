'use client';
import React, { useEffect } from "react";
import type { GameProps, Player, GameStatus, PlayerScore } from "../../../../server/types/types";
import { useState } from "react";
import {Socket, io} from "socket.io-client";
import LeaderboardCard from "@/components/ui/leaderboard-card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "@/app/ui/navbar";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Slider} from "@/components/ui/slider";
import { cn } from "@/lib/utils"


export default function Game({ gameId, name }: GameProps) {
  const [ioInstance, setIoInstance] = useState<Socket>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('not-started');
  const [paragraph, setParagraph] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [inputParagraph, setInputParagraph] = useState<string>('');
  const [health, setHealth] = useState<number>(5);
  const [time, setTime] = useState<number>(60);
  const [textLength, setTextLength] = useState<number>(100);

  useEffect(() => {
    /* ********************* CHANGE THE HARD CODED URL LATER ********************************* */
    const socket = io('http://localhost:8080', {
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

    ioInstance.on('game-started', (paragraph: string) => {
      setParagraph(paragraph);
      setGameStatus('in-progress');
    });

    ioInstance.on('game-finished', () => {
      setGameStatus('finished');
      setInputParagraph('');
    });

    ioInstance.on('new-host', (id: string) => {
      setHost(id);
    });

    ioInstance.on('error', (message: string) => {
      console.log(message);
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
  }

  function startGame() {
    if (!ioInstance) return;

    ioInstance.emit('start-game');
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
            <h1 className={'text-2xl font-bold'}>Waiting for players to join...</h1>

            {host === ioInstance?.id && (
              <div>
                <Button className={'mt-10 px-20'} onClick={startGame}>
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
                        <h2>Health:</h2>
                          <ToggleGroup
                            variant={'outline'}
                            type={'single'}
                            defaultValue={3}
                            onValueChange={(value) => setHealth(value)}
                          >
                            <ToggleGroupItem value={-1}>Off</ToggleGroupItem>
                            <ToggleGroupItem value={1}>1</ToggleGroupItem>
                            <ToggleGroupItem value={2}>2</ToggleGroupItem>
                            <ToggleGroupItem value={3}>3</ToggleGroupItem>
                            <ToggleGroupItem value={4}>4</ToggleGroupItem>
                            <ToggleGroupItem value={5}>5</ToggleGroupItem>
                          </ToggleGroup>
                        <h2>Time:</h2>
                        <ToggleGroup
                          type={'single'}
                          variant={'outline'}
                          defaultValue={60}
                          onValueChange={(value) => setTime(value)}
                        >
                          <ToggleGroupItem value={-1}>Off</ToggleGroupItem>
                          <ToggleGroupItem value={30}>30s</ToggleGroupItem>
                          <ToggleGroupItem value={60}>60s</ToggleGroupItem>
                          <ToggleGroupItem value={90}>90s</ToggleGroupItem>
                          <ToggleGroupItem value={120}>120s</ToggleGroupItem>
                        </ToggleGroup>
                        <div className={'py-2'}>
                          <h2>Text Length:</h2>
                          <div className={'py-2'}>
                            <Label>{textLength} words</Label>
                            <Slider
                              className={'my-2'}
                              defaultValue={[100]}
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

        {gameStatus === 'in-progress' && (
          <div className={'h-full'}>
            <h1 className={'text-2xl font-bold mb-10'}>Type the paragraph below</h1>
            <div className={'relative h-full'}>
              <p className={'text-2xl lg:text-5xl p-5'}>{paragraph}</p>

              <Textarea
                value={inputParagraph}
                onChange={(e) => setInputParagraph(e.target.value)}
                className={'text-2xl lg:text-5xl outline-none p-5 absolute top-0 left-0 right-0 bottom-0 z-10 opacity-75'}
                placeholder=''
                disabled={gameStatus !== 'in-progress' || !ioInstance}
              />
            </div>
          </div>
        )}

        {gameStatus === 'finished' && (
          <div>
            <h1>
              Game Finished!
              {ioInstance?.id === host && ' Restart the game fresh!'}
            </h1>

            {host === ioInstance?.id && (
              <Button className={'mt-10 px-20'} onClick={startGame}>
                Start Game
              </Button>
            )}
          </div>
          )}
      </div>
    </div>
    </div>
  );
}