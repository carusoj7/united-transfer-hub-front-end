//npm modules
import { useState } from "react";

//services
import * as playerService from '../../services/playerService'

//components
import PlayerCard from "../../components/PlayerCard/PlayerCard";

// types
import { Profile, Player } from '../../types/models'

//css
import styles from './TransferHub.module.css'

interface PlayerProps {
  players: Player[];
  profileName: string
}

const AllPlayers = (props: PlayerProps): JSX.Element => {
  const { players, profileName } = props

  if (!players.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  return (
    <main className={styles.container}>
      <h1>Transfer Hub</h1>
      {players.map((player: Player) => (
        <PlayerCard
        key={player.name}
        player={player}
        profileName= {profileName}
        />
      ))}
    </main>
  )
}

export default AllPlayers