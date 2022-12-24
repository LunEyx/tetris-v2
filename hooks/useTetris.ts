import { useEffect, useState } from 'react'

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
  const [dropTrigger, setDropTrigger] = useState<boolean>(false)
  const [lockDelay, setLockDelay] = useState<number>(-1)
  const [nextBlockGroup, setNextBlockGroup] = useState<TetrisBlockGroup>([])
  const [state, setState] = useState<TetrisState>(TetrisState.READY)
  const [shouldDrop, setShouldDrop] = useState<boolean>(false)

  useEffect(() => {
    if (state !== TetrisState.PLAYING) return

    const intervalId = setInterval(() => {
      gravity()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [state, currentBlockGroup])

  useEffect(() => {
    console.log('re count')
    if (state !== TetrisState.PLAYING) return

    const timeoutId = setTimeout(() => {
      setShouldDrop(true)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [state, dropTrigger])

  useEffect(() => {
    console.log('shouldDrop', shouldDrop)
    if (state !== TetrisState.PLAYING) return

    if (shouldDrop) {
      softDrop()
      setShouldDrop(false)
    }
  }, [state, shouldDrop])

  const reset = () => {
    setBoard(generateBoard())
    setCurrentBlockGroup([])
    setDropTrigger(false)
    setLockDelay(-1)
    setNextBlockGroup([])
    setState(TetrisState.READY)
  }

  const placeCurrentBlockGroup = () => {
    setLockDelay(-1)
    for (const block of currentBlockGroup) {
      board[block.y][block.x] = block.color
    }
    setBoard(board)
    nextBlock()
  }

  const nextBlock = () => {
    if (nextBlockGroup.length === 0) {
      setCurrentBlockGroup(
        JSON.parse(
          JSON.stringify(BLOCKS[Math.floor(Math.random() * BLOCKS.length)])
        )
      )
    } else {
      setCurrentBlockGroup(nextBlockGroup)
    }
    setNextBlockGroup(
      JSON.parse(
        JSON.stringify(BLOCKS[Math.floor(Math.random() * BLOCKS.length)])
      )
    )
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

  const isMovable = (offsetX: number, offsetY: number) => {
    for (const block of currentBlockGroup) {
      if (block.x + offsetX < 0 || block.x + offsetX >= BOARD_WIDTH)
        return false
      if (block.y + offsetY < 0 || block.y + offsetY >= BOARD_HEIGHT)
        return false
      const sampleBlock = board[block.y + offsetY][block.x + offsetX]
      if (sampleBlock !== TetrisBlockColor.EMPTY) return false
    }

    return true
  }

  const move = (offsetX: number, offsetY: number) => {
    if (!isMovable(offsetX, offsetY)) return

    const newBlockGroup = currentBlockGroup.map((block) => ({
      ...block,
      x: block.x + offsetX,
      y: block.y + offsetY,
    }))
    for (const block of currentBlockGroup) {
      block.x += offsetX
      block.y += offsetY
    }

    setLockDelay(-1)
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

  const gravity = () => {
    if (state !== TetrisState.PLAYING) return
    console.log('gravity', lockDelay)

    if (isMovable(0, 1)) {
      move(0, 1)
    } else if (lockDelay === 0) {
      placeCurrentBlockGroup()
    } else if (lockDelay === -1) {
      setLockDelay(2)
    } else {
      setLockDelay((prev) => prev - 1)
    }
  }

  const softDrop = () => {
    if (state !== TetrisState.PLAYING) return

    if (isMovable(0, 1)) {
      move(0, 1)
    } else {
      placeCurrentBlockGroup()
    }
    setDropTrigger((prev) => !prev)
  }

  const rotateCw = () => {
    placeCurrentBlockGroup()
    // if (state !== TetrisState.PLAYING) return

    // move(0, -1)
  }

  const hardDrop = () => {
    if (state !== TetrisState.PLAYING) return

    let downStep = 1

    while (isMovable(0, downStep)) {
      downStep++
    }

    move(0, downStep - 1)
    placeCurrentBlockGroup()
    setDropTrigger((prev) => !prev)
  }

  const displayBoard = []
  for (const row of board) {
    displayBoard.push([...row])
  }
  if (state === TetrisState.PLAYING) {
    // shadow
    let downStep = 1

    while (isMovable(0, downStep)) {
      downStep++
    }

    for (const block of currentBlockGroup) {
      displayBoard[block.y + downStep - 1][block.x] = TetrisBlockColor.SHADOW
    }

    // current block
    for (const block of currentBlockGroup) {
      displayBoard[block.y][block.x] = block.color
    }
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
    softDrop,
    hardDrop,
    rotateCw,
  }
}

export default useTetris
