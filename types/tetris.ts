export enum TetrisBlockColor {
  EMPTY = 'EMPTY',
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  CYAN = 'CYAN',
  ORANGE = 'ORANGE',
}

export interface TetrisBlock {
  x: number
  y: number
  color: TetrisBlockColor
}

export interface TetrisBoard extends Array<Array<TetrisBlockColor>> {}

export interface TetrisBlockGroup extends Array<TetrisBlock> {}

export enum TetrisState {
  READY = 'READY',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAMEOVER = 'GAMEOVER',
}

export type AtMostOneStep = -1 | 0 | 1
