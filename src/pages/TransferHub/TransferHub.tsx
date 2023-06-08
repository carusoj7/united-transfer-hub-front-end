
//npm modules

//services
//import * as playerService from '../../services/playerService'

//components
import PlayerCard from "../../components/PlayerCard/PlayerCard";

// types
import { Player, User } from '../../types/models'
import { PlayerFormData } from "../../types/forms";


//css
import styles from './TransferHub.module.css'

interface PlayerProps {
  players: Player[]
  profileName: string
  user: User | null
  handleDeletePlayer: (playerId: number) => Promise<void>;
  
}

const AllPlayers = (props: PlayerProps): JSX.Element => {
  const { players, profileName, user, handleDeletePlayer } = props
  const profileId =  user?.profile.id ? user.profile.id : 0
  console.log(profileId, "profile id");
  
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
        profileId= {profileId}
        handleDeletePlayer={handleDeletePlayer}
        />
      ))}
    </main>
  )
}

export default AllPlayers