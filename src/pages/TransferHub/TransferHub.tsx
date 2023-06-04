//npm modules
import { useState } from "react";

//services
import * as playerService from '../../services/playerService'

// types
import { Profile, Player } from '../../types/models'

//css
import styles from './TransferHub.module.css'

interface PlayerProps {
  players: Player[];
}

const AllPlayers = (props: PlayerProps): JSX.Element => {
  const { players } = props

  if (!players.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  return (
    <main className={styles.container}>
      <h1>Transfer Hub</h1>
    </main>
  )
}

export default AllPlayers