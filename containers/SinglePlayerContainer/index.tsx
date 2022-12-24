import { Box, Button, Container } from '@chakra-ui/react'
import { FC, KeyboardEventHandler, useEffect, useRef, useState } from 'react'

import Tetris from '../../components/Tetris'
import useTetris from '../../hooks/useTetris'
import { TetrisState } from '../../types/tetris'

const SinglePlayerContainer: FC = () => {
  const { board, state, start, left, right, down, up } = useTetris()
  const ref = useRef<any>(null)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log('handleKeyPress', event.key)
      switch (event.key) {
        case 'ArrowLeft':
          left()
          break
        case 'ArrowRight':
          right()
          break
        case 'ArrowDown':
          down()
          break
        case 'ArrowUp':
          up()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [left, right, down, up])

  const handleStartClick = () => {
    start()
  }

  console.log('rerender')

  return (
    <Container
      maxW="md"
      pos="relative"
    >
      <Box
        w="full"
        h="10vh"
        bg="green.100"
      ></Box>
      <Tetris
        ref={ref}
        board={board}
      />
      {state === TetrisState.READY && (
        <Button
          onClick={handleStartClick}
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          Start
        </Button>
      )}
    </Container>
  )
}

export default SinglePlayerContainer
