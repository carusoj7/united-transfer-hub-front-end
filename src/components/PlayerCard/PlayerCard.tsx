import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { Player } from '../../types/models';
import { Vote } from '../../types/models';

import * as voteService from '../../services/voteService'

import styles from './PlayerCard.module.css';
import VoteManager from '../VoteManager/VoteManager';

interface PlayerCardProps {
  player: Player;
  profileName: string;
  profileId: number;
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName, profileId } = props;
  const [votes, setVotes] = useState<Vote>({ profileId: 0, playerId: 0, upvotes: 0, downvotes: 0 })

  console.log(player, 'This is player');

  useEffect(() => {
    async function fetchVotes() {
      const playerVotes = await voteService.fetchVotes(player.id);
      setVotes({
        profileId: profileId,
        playerId: player.id,
        upvotes: playerVotes.upvotes,
        downvotes: playerVotes.downvotes,
      });
      console.log(playerVotes);
    }

    fetchVotes();
  }, [player.id, profileId]);

  const handleUpvote = async () => {
    try {
      await voteService.upvotePlayer(player.id)
      setVotes((prevVotes) => ({
        ...prevVotes,
        playerId:player.id,
        profileId: profileId,
        upvotes: (prevVotes?.upvotes || 0) + 1,
        downvotes: prevVotes?.downvotes || 0,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    try {
      await voteService.downvotePlayer(player.id)
      setVotes((prevVotes) => ({
        ...prevVotes,
        playerId: player.id,
        profileId: profileId,
        upvotes: prevVotes?.upvotes || 0,
        downvotes: (prevVotes?.downvotes || 0) + 1,
      }))
    } catch (error) {
      console.log(error);
    }
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
      <img src={player.photo ? player.photo : '/default-player.jpeg'} alt="" className={styles.playercardImg} />
      <div className={styles.playerCardContent}>
        <h1>
          {player.name} {profileName}
        </h1>
        <p>Age: {player.age}</p>
        <p>Position: {player.position}</p>
        <p>Current Team: {player.team}</p>
        <p>Estimated Transfer Fee: £{player.transferFee.toLocaleString()}</p>
        <VoteManager
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          player={{ ...player, votesReceived: []}}
          profileId={profileId}
          votes={votes ?? { upvotes: 0, downvotes: 0 }}
        />
      </div>
    </Box>
  );
};

export default PlayerCard;