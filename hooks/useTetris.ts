import { useState } from 'react'

import { BLOCKS, BOARD_HEIGHT, BOARD_WIDTH } from '../constants/tetris'
import {
  AtMostOneStep,
  TetrisBlockColor,
  TetrisBlockGroup,
  TetrisBoard,
  TetrisState,
} from '../types/tetris'

const generateBoard = (): TetrisBoard => {
  const board: TetrisBoard = []
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    const row = []
    for (let x = 0; x < BOARD_WIDTH; x++) {
      row.push(TetrisBlockColor.EMPTY)
    }
    board.push(row)
  }

  return board
}

const useTetris = () => {
  const [board, setBoard] = useState<TetrisBoard>(generateBoard())
  const [currentBlockGroup, setCurrentBlockGroup] = useState<TetrisBlockGroup>(
    []
  )
  const [nextBlockGroup, setNextBlockGroup] = useState<TetrisBlockGroup>([])
  const [state, setState] = useState<TetrisState>(TetrisState.READY)

  const placeCurrentBlockGroup = () => {
    for (const block of currentBlockGroup) {
      board[block.y][block.x] = block.color
    }
    setBoard(board)
  }

  const nextBlock = () => {
    if (nextBlockGroup.length === 0) {
      setCurrentBlockGroup(BLOCKS[Math.floor(Math.random() * BLOCKS.length)])
    } else {
      setCurrentBlockGroup(nextBlockGroup)
    }
    setNextBlockGroup(BLOCKS[Math.floor(Math.random() * BLOCKS.length)])
  }

  const start = () => {
    setState(TetrisState.PLAYING)
    nextBlock()
  }

  const pause = () => {
    setState(TetrisState.PAUSED)
  }

  const resume = () => {
    setState(TetrisState.PLAYING)
  }

  const move = (offsetX: AtMostOneStep, offsetY: AtMostOneStep) => {
    for (const block of currentBlockGroup) {
      if (block.x + offsetX < 0 || block.x + offsetX >= BOARD_WIDTH) return
      if (block.y + offsetY < 0 || block.y + offsetY >= BOARD_HEIGHT) return
      const sampleBlock = board[block.y + offsetY][block.x + offsetX]
      if (sampleBlock !== TetrisBlockColor.EMPTY) return
    }

    const newBlockGroup = currentBlockGroup.map((block) => ({
      ...block,
      x: block.x + offsetX,
      y: block.y + offsetY,
    }))

    setCurrentBlockGroup(newBlockGroup)
  }

  const left = () => {
    if (state !== TetrisState.PLAYING) return

    move(-1, 0)
  }

  const right = () => {
    if (state !== TetrisState.PLAYING) return

    move(1, 0)
  }

  const down = () => {
    if (state !== TetrisState.PLAYING) return

    move(0, 1)
  }

  const up = () => {
    placeCurrentBlockGroup()
    nextBlock()
    // if (state !== TetrisState.PLAYING) return

    // move(0, -1)
  }

  const displayBoard = []
  for (const row of board) {
    displayBoard.push([...row])
  }
  for (const block of currentBlockGroup) {
    displayBoard[block.y][block.x] = block.color
  }

  return {
    // game states
    board: displayBoard,
    state,
    nextBlockGroup,
    currentBlockGroup,
    // game actions
    start,
    pause,
    resume,
    // current block move
    left,
    right,
    down,
    up,
  }
}

export default useTetris
