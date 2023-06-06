import Box from '@mui/material/Box'

//types
import { Vote } from '../../types/models'
import { Profile, Player } from '../../types/models'

//componenets
import VoteManager from '../VoteManager/VoteManager'
//css
import styles from './PlayerCard.module.css'

interface PlayerCardProps {
  player: Player
  profileName: string
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName } = props

  const handleUpVote = (vote: Vote): void => {

  }

  const handleDownVote = (vote: Vote): void =. {

  }

  return (
    <Box 
      component= "div"
      key={player.id}
      className={styles.playerCard}
      display="flex" 
      justifyContent="spread-evenly" 
      alignItems="center"
      flexDirection="row"
      borderRadius="12px"
      padding="6px"
      marginTop="6px"
      >
    <Box ><img src={player.photo? player.photo:'/BWdog_icon.png'} alt="" className={styles.playercardImg} /></Box>
    <Box className={styles.playerCardContent}>
    <article>
      <h1>{player.name}
        {profileName}
      </h1>
      <p>Age: {player.age}</p>
      <p>Position: {player.position}</p>
      <p>Current Team: {player.team}</p>
      <p>Estimated Transfer Fee: {player.transferFee}</p>
      <VoteManager
      vote={{
        id: player.id,
        playerId: player.id,
        profileId: player.profileId,
        upvotes: player.upvotes,
        downvotes: player.downvotes
      }}
      handleUpvote={handleUpVote}
      handleDownvote={handleDownVote}
    />
      <div>{player.upvotes}</div>
      <div>{player.upvotes}</div>
    </article>
    </Box>
    </Box>
  )
}

export default PlayerCard