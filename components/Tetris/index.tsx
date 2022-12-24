import { Box, Flex, FlexProps, forwardRef } from '@chakra-ui/react'
import { FC, ForwardRefRenderFunction, Fragment, useRef } from 'react'
import { TetrisBlockColor, TetrisBoard, TetrisState } from '../../types/tetris'

interface TetrisProps extends FlexProps {
  board: TetrisBoard
}

const Tetris = forwardRef<TetrisProps, 'div'>((props, ref) => {
  const { board, ...flexProps } = props

  return (
    <Flex
      ref={ref}
      wrap="wrap"
      {...flexProps}
    >
      {board.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {row.map((color, cellIndex) => {
            let bg = 'gray.800'
            switch (color) {
              case TetrisBlockColor.EMPTY:
                bg = 'gray.800'
                break
              case TetrisBlockColor.SHADOW:
                bg = 'gray.200'
                break
              default:
                bg = color
            }

            const opacity =
              color === TetrisBlockColor.EMPTY
                ? (rowIndex + cellIndex) % 2 === 0
                  ? 1
                  : 0.9
                : 1

            return (
              <Box
                key={cellIndex}
                w="calc(100% / 10)"
                sx={{ aspectRatio: '1 / 1' }}
                opacity={opacity}
                bg={bg}
              />
            )
          })}
        </Fragment>
      ))}
    </Flex>
  )
})

export default Tetris
