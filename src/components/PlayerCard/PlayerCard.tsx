import Box from '@mui/material/Box'

//types

//css
import styles from './PlayerCard.module.css'
import { Profile, Player } from '../../types/models'

interface PlayerCardProps {
  player: Player
  profileName: string
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName } = props

  return (
    <Box className={styles.playerCardContent}>
    <article>
      <h1>{player.name}
        {profileName}
      </h1>
    </article>
    </Box>
  )
}

export default PlayerCard