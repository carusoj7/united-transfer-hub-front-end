import Box from '@mui/material/Box'

//npm modules
import { useState, useEffect } from 'react'
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
  vote?:Vote
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName } = props
  const [vote, setVote] = useState<Vote | undefined>(player.vote)

  useEffect(() => {
    getVotesForPlayer(player.id)
      .then((votes) => {
        const initialVote: Vote = votes || { upvotes: 0, downvotes: 0 }
        setVote(initialVote)
      })
    
  }, [player.id]);

  const handleUpvote = (v?: Vote): void => {
    if (!vote) {
      const updatedVote = { ...v, upvotes: v.upvotes + 1}
      setVote(updatedVote)
    }
  }

  const handleDownvote = (v?: Vote): void => {
    if (!vote) {
      const updatedVote = { ...v!, downvotes: v!.downvotes + 1}
      setVote(updatedVote)
    }
  }

  const upvotes = vote?.upvotes || 0
  const downvotes = vote?.downvotes || 0

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
    <Box ><img src={player.photo? player.photo:'/default-player-jpeg'} alt="" className={styles.playercardImg} /></Box>
    <Box className={styles.playerCardContent}>
      <h1>{player.name}
        {profileName}
      </h1>
      <p>Age: {player.age}</p>
      <p>Position: {player.position}</p>
      <p>Current Team: {player.team}</p>
      <p>Estimated Transfer Fee: {player.transferFee}</p>
      {upvotes > 0 || downvotes > 0 ? (
        <VoteManager
          vote={vote}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      ) : null}
      <p>Upvotes: {upvotes}</p>
      <p>Downvotes: {downvotes}</p>
    </Box>
    </Box>
  )
}

export default PlayerCard