export type Player = {
  id: string;
  name: string;
  health: number;
  wpm: number;
  accuracy: number;
};

export type PlayerScore = {
  id: string;
  score: number;
};

export type GameStatus = 'not-started' | 'in-progress' | 'finished';

export type GameProps = {
  name: string;
  gameId: string;
};