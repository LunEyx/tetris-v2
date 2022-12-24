import { Button, chakra, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

const MenuButton: typeof Button = chakra(Button, {
  baseStyle: {
    w: '40',
    h: '16',
    fontSize: '20',
    bg: 'blue.500',
    color: 'white',
    borderRadius: '10px',
  },
})

const Menu: FC = () => {
  const router = useRouter()

  const handleStart = () => {
    router.push('/tetris/single-player')
  }

  return (
    <VStack spacing={4}>
      <MenuButton onClick={handleStart}>Start</MenuButton>
      <MenuButton bg="green.400">Settings</MenuButton>
    </VStack>
  )
}

export default Menu
