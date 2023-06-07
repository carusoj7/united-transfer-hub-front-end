import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { Player, Vote } from '../../types/models';
import * as voteService from '../../services/voteService';
import styles from './PlayerCard.module.css';

import VoteManager from '../VoteManager/VoteManager';

interface PlayerCardProps {
  player: Player;
  profileName: string;
  profileId: number;
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName, profileId } = props;
  const [votes, setVotes] = useState<Vote | null>(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const vote = await voteService.getVotesForPlayer(player.id);
        setVotes(vote);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVotes();
  }, [player.id]);

  const updateVotes = async (updatedVotes: Vote) => {
    try {
      await voteService.updateVotesForPlayer(player.id, updatedVotes, setVotes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpvote = async (): Promise<void> => {
    if (votes && votes.profileId === profileId) {
      // User has already voted, show an error or prevent voting again
      return;
    }

    try {
      if (votes) {
        const updatedVotes = {
          ...votes,
          upvotes: votes.upvotes + 1,
        };
        await updateVotes(updatedVotes);
      } else {
        const newVotes = {
          playerId: player.id,
          profileId,
          upvotes: 1,
          downvotes: 0,
        };
        await voteService.upvotePlayer(player.id, profileId);
        setVotes(newVotes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async (): Promise<void> => {
    if (votes && votes.profileId === profileId) {
      // User has already voted, show an error or prevent voting again
      return;
    }

    try {
      if (votes) {
        const updatedVotes = {
          ...votes,
          downvotes: votes.downvotes + 1,
        };
        await updateVotes(updatedVotes);
      } else {
        const newVotes = {
          playerId: player.id,
          profileId,
          upvotes: 0,
          downvotes: 1,
        };
        await voteService.downvotePlayer(player.id, profileId);
        setVotes(newVotes);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <p>Estimated Transfer Fee: {player.transferFee}</p>
        <VoteManager
          vote={votes}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      </div>
    </Box>
  );
};

export default PlayerCard;