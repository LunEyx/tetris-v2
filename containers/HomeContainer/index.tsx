import { VStack } from '@chakra-ui/react'
import { FC } from 'react'

import Menu from '../../components/Home/Menu'
import HomeTitle from '../../components/Home/Title'

const HomeContainer: FC = () => {
  return (
    <VStack justify="center" h="100vh" spacing={12}>
      <HomeTitle />
      <Menu />
    </VStack>
  )
}

export default HomeContainer
