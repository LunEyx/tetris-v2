import Head from 'next/head'
import { FC } from 'react'

import HomeContainer from '../containers/HomeContainer'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Tetris V2</title>
      </Head>
      <HomeContainer />
    </>
  )
}

export default Home
