'use client';
import React, { useEffect } from "react";
import type { GameProps, Player, GameStatus, PlayerScore } from "../../../../server/types/types";
import { useState } from "react";
import {Socket, io} from "socket.io-client";

export default function Game({ gameId, name }: GameProps) {
  const [ioInstance, setIoInstance] = useState<Socket>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('not-started');
  const [paragraph, setParagraph] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [inputParagraph, setInputParagraph] = useState<string>('');

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string, {
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

  return (
    <div className={'w-screen p-10 grid grid-cols-1 lg:grid-cols-3 gap-10'}>

    </div>
  );
}