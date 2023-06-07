import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { Player } from '../../types/models';
import * as playerService from '../../services/playerService';
import styles from './PlayerCard.module.css';

import VoteManager from '../VoteManager/VoteManager';

interface PlayerCardProps {
  player: Player;
  profileName: string;
  profileId: number;
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName } = props;
  const [votes, setVotes] = useState<{ upvotes?: number; downvotes?: number } | null>(null)

  useEffect(() => {
    async function fetchVotes() {
      const playerVotes = await playerService.fetchVotes(player.id);
      setVotes(playerVotes);
    }

    fetchVotes();
  }, [player.id]);

  const handleUpvote = async () => {
    try {
      await playerService.upvotePlayer(player.id);
      setVotes((prevVotes) => ({
        ...prevVotes,
        upvotes: (prevVotes?.upvotes || 0) + 1
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    try {
      await playerService.downvotePlayer(player.id);
      setVotes((prevVotes) => ({
        ...prevVotes,
        downvotes: (prevVotes?.downvotes || 0) + 1
      }));
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
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          player={player}
        />
      </div>
    </Box>
  );
};

export default PlayerCard;