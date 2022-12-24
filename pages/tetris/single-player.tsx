import { FC } from 'react'
import Head from 'next/head'
import SinglePlayerContainer from '../../containers/SinglePlayerContainer'

const SinglePlayer: FC = () => {
  return (
    <>
      <Head>
        <title>Tetris: Single Player</title>
      </Head>
      <SinglePlayerContainer />
    </>
  )
}

export default SinglePlayer
