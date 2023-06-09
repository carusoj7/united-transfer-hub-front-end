import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import { Player } from '../../types/models'
import { Vote } from '../../types/models'
import { Link } from 'react-router-dom'
import * as voteService from '../../services/voteService'
import styles from './PlayerCard.module.css'
import VoteManager from '../VoteManager/VoteManager'

interface PlayerCardProps {
  player: Player
  profileName: string
  profileId: number
  handleDeletePlayer: (playerId: number) => Promise<void>
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName, profileId, handleDeletePlayer } = props
  const [vote, setVote] = useState<Vote>({ profileId: 0, playerId: 0, vote: 0 })
  const [upvotes, setUpvotes] = useState(0)
  const [downvotes, setDownvotes] = useState(0)

  useEffect(() => {
    async function fetchVotes() {
      const playerVotes = await voteService.fetchVotes(player.id)
      setVote(playerVotes.existingVote)
      setUpvotes(playerVotes.upvotes)
      setDownvotes(playerVotes.downvotes)
    }
    fetchVotes()
  }, [player.id, profileId])

  const handleUpvote = async () => {
    try {
      const updatedVote = await voteService.upvotePlayer(player.id)
      if (vote?.vote === -1) {
        setDownvotes(value => value - 1)
      }
      setVote(updatedVote)
      setUpvotes(value => value + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownvote = async () => {
    try {
      const updatedVote = await voteService.downvotePlayer(player.id)
      if (vote?.vote === 1) {
        setUpvotes(value => value - 1)
      }
      setVote(updatedVote)
      setDownvotes(value => value + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    handleDeletePlayer(player.id)
  }

  return (
    <Box
      component="div"
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
      <img src={player.photo ? player.photo : '/default-player.jpeg'} alt="" className={styles.playercardImg} style={{ width: "250px", height: "250px" }} />

      <div className={styles.playerCardContent}>
        <h2>
          {player.name} {profileName}
        </h2>
        <p>Age: {player.age}</p>
        <p>Position: {player.position}</p>
        <p>Current Team: {player.team}</p>
        <p>Estimated Transfer Fee: £{player.transferFee.toLocaleString()}</p>
        <VoteManager
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          vote={vote}
          profileId={profileId}
          upvotes={upvotes}
          downvotes={downvotes}
        />
      </div>
      {profileId == player.profileId &&
        <>
          <button className={styles.edit}>
            <Link to={`/${player.id}/edit`} state={player}>
              Edit
            </Link>
          </button>
          <button className={styles.delete} onClick={handleDelete}>Delete</button>
        </>
      }
    </Box>
  )
}

export default PlayerCard