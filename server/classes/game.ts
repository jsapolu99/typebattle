import {Server, Socket} from "socket.io";
import {generateParagraph} from "../utils/generateParagraph";
import { rooms } from "../setupListeners";

export class Game {
  gameStatus: 'not-started' |'in-progress' |'finished';
  gameId: string;
  players: { id: string; name: string; health: number; wpm: number; accuracy: number; coins: number }[];
  io: Server;
  gameHost: string;
  paragraph: string;

  constructor(id: string, io: Server, host: string) {
    this.gameId = id;
    this.players = [];
    this.io = io;
    this.gameHost = host;
    this.gameStatus = 'not-started';
    this.paragraph = '';
  }

  setupListeners(socket: Socket) {
    socket.on('start-game', async () => {
      if (this.gameStatus === 'in-progress') return socket.emit('error', 'Game already in progress');

      if (this.gameHost !== socket.id) return socket.emit('error', 'Only the host can start the game');

      for (const player of this.players) {
        player.wpm = 0;
        player.accuracy = 0;
        player.coins = 0;
        player.health = 3;
      }
      this.io.to(this.gameId).emit('players', this.players);

      this.gameStatus = 'in-progress';

      const paragraph = await generateParagraph();

      this.paragraph = paragraph;

      this.io.to(this.gameId).emit('game-started', paragraph);

      setTimeout(() => {
        this.gameStatus = 'finished';
        this.io.to(this.gameId).emit('game-finished');
        this.io.to(this.gameId).emit('players', this.players);
      }, 60000);
    });

    socket.on('player-typed', (typed: string) => {
      if (this.gameStatus !== 'in-progress') return socket.emit('error', 'The game has not yet started');

      const splitParagraphWords = this.paragraph.split(' ');
      const splitTypedWords = typed.split(' ');
      const splitParagraphChars = this.paragraph.split('');
      const splitTypedChars = typed.split('');

      let wpm, accuracy = 0;
      for (let i = 0; i < splitTypedChars.length; i++) {
        if (splitTypedChars[i] === splitParagraphChars[i]) {
          accuracy++;
          // **************************** NEED TO CONTINUE WORK HERE WILL LIKELY HAVE TO CHANGE HOW THE GAME IS PLAYED ******************************
        } else {
          break;
        }
      }
      const player = this.players.find(player => player.id === socket.id);

      if (player) player.accuracy = accuracy;

      this.io.to(this.gameId).emit('player-score', {id: socket.id, wpm, accuracy});
    });

    socket.on('leave', () => {
      if (this.gameHost === socket.id) {
        this.players = this.players.filter((player) => player.id !== socket.id);

        if (this.players.length !== 0) {
          this.gameHost = this.players[0].id;
          this.io.to(this.gameId).emit('new-host', this.gameHost);
          this.io.to(this.gameId).emit('player-left', socket.id);
        } else {
          rooms.delete(this.gameId);
        }
      }
      socket.leave(this.gameId);
      this.players = this.players.filter((player) => player.id !== socket.id);
      this.io.to(this.gameId).emit('player-left', socket.id);
    });

    socket.on('disconnect', () => {
      if (this.gameHost === socket.id) {
        this.players = this.players.filter((player) => player.id !== socket.id);

        if (this.players.length !== 0) {
          this.gameHost = this.players[0].id;
          this.io.to(this.gameId).emit('new-host', this.gameHost);
          this.io.to(this.gameId).emit('player-left', socket.id);
        } else {
          rooms.delete(this.gameId);
        }
      }
      socket.leave(this.gameId);
      this.players = this.players.filter((player) => player.id !== socket.id);
      this.io.to(this.gameId).emit('player-left', socket.id);
    });
  }

  joinPlayer(id: string, name: string, socket: Socket) {
    if (this.gameStatus === 'in-progress') return socket.emit('error', 'Game already in progress');

    this.players.push({id, name, health: 3, wpm: 0, accuracy: 0, coins: 0});
    this.io.to(this.gameId).emit('player-joined', {
      id, name, health: 3, wpm: 0, accuracy: 0, coins: 0
    });

    socket.emit('player', this.players);
    socket.emit('new-host', this.gameHost);

    this.setupListeners(socket);
  }
}