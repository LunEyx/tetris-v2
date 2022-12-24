import { TetrisBlockColor } from '../types/tetris'

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const BLOCKS = [
  [
    { x: 0, y: 0, color: TetrisBlockColor.CYAN },
    { x: 1, y: 0, color: TetrisBlockColor.CYAN },
    { x: 2, y: 0, color: TetrisBlockColor.CYAN },
    { x: 3, y: 0, color: TetrisBlockColor.CYAN },
  ],
  [
    { x: 0, y: 0, color: TetrisBlockColor.BLUE },
    { x: 0, y: 1, color: TetrisBlockColor.BLUE },
    { x: 1, y: 1, color: TetrisBlockColor.BLUE },
    { x: 2, y: 1, color: TetrisBlockColor.BLUE },
  ],
  [
    { x: 2, y: 0, color: TetrisBlockColor.ORANGE },
    { x: 1, y: 1, color: TetrisBlockColor.ORANGE },
    { x: 2, y: 1, color: TetrisBlockColor.ORANGE },
    { x: 0, y: 1, color: TetrisBlockColor.ORANGE },
  ],
  [
    { x: 0, y: 0, color: TetrisBlockColor.YELLOW },
    { x: 1, y: 0, color: TetrisBlockColor.YELLOW },
    { x: 1, y: 1, color: TetrisBlockColor.YELLOW },
    { x: 0, y: 1, color: TetrisBlockColor.YELLOW },
  ],
  [
    { x: 0, y: 1, color: TetrisBlockColor.GREEN },
    { x: 1, y: 1, color: TetrisBlockColor.GREEN },
    { x: 1, y: 0, color: TetrisBlockColor.GREEN },
    { x: 2, y: 0, color: TetrisBlockColor.GREEN },
  ],
  [
    { x: 0, y: 1, color: TetrisBlockColor.PURPLE },
    { x: 1, y: 1, color: TetrisBlockColor.PURPLE },
    { x: 1, y: 0, color: TetrisBlockColor.PURPLE },
    { x: 2, y: 1, color: TetrisBlockColor.PURPLE },
  ],
  [
    { x: 0, y: 0, color: TetrisBlockColor.RED },
    { x: 1, y: 0, color: TetrisBlockColor.RED },
    { x: 1, y: 1, color: TetrisBlockColor.RED },
    { x: 2, y: 1, color: TetrisBlockColor.RED },
  ],
]
