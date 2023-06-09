//components
import PlayerCard from "../../components/PlayerCard/PlayerCard"

// types
import { Player, User } from '../../types/models'

//css
import styles from './TransferHub.module.css'
import { ChangeEvent } from "react"

interface PlayerProps {
  players: Player[] | null
  profileName: string
  user: User | null
  handleDeletePlayer: (playerId: number) => Promise<void>
  handleSearch: (searchTerm: string) => Promise<void>

}
const TransferHub = (props: PlayerProps): JSX.Element => {
  const { players, profileName, user, handleDeletePlayer, handleSearch } = props
  const profileId = user?.profile.id ? user.profile.id : 0
  if (!players) {
    return <main className={styles.container}><h1>Loading...</h1></main>

  }
  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    handleSearch(evt.target.value)
  }
  return (
    <main className={styles.container}>
      <h1>Transfer Hub</h1>

      <input
        type="search"
        id="name"
        name="name"
        onChange={handleSearchChange}
        placeholder="Search for a player"
      />

      {players && players.length > 0 && players.map((player: Player) => (
        <PlayerCard
          key={player.id}
          player={player}
          profileName={profileName}
          profileId={profileId}
          handleDeletePlayer={handleDeletePlayer}
        />
      ))}
      {players && players.length === 0 && <h2>No players found</h2>}
    </main>
  )
}

export default TransferHub