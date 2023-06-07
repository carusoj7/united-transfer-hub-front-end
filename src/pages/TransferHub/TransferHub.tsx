import { Box } from "@mui/material";

//npm modules

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
  profileId: number
}

const AllPlayers = (props: PlayerProps): JSX.Element => {
  const { players, profileName, profileId } = props

  if (!players.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  return (
    <main className={styles.container}>
      <h1>Transfer Hub</h1>
      {players.map((player: Player) => (
        <PlayerCard
        key={player.id}
        player={player}
        profileName= {profileName}
        profileId={profileId}
        />
      ))}
    </main>
  )
}

export default AllPlayers