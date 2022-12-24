export enum TetrisBlockColor {
  EMPTY = 'EMPTY',
  SHADOW = 'SHADOW',
  RED = 'red.500',
  GREEN = 'green.500',
  BLUE = 'blue.500',
  YELLOW = 'yellow.500',
  PURPLE = 'pink.800',
  CYAN = 'cyan.500',
  ORANGE = 'orange.500',
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
