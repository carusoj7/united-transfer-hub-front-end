import { useState } from "react";
import { Player, Vote } from "../../types/models";

import styles from './VoteManager.module.css'

interface VoteProps {
  player: Player;
  profileId: number;
  handleUpvote: () => Promise<void>;
  handleDownvote: () => Promise<void>;
  votes: Vote;
}

const VoteManager = (props: VoteProps): JSX.Element => {
  const { player, profileId, handleUpvote, handleDownvote, votes } = props;
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hasDownvoted, setHasDownvoted] = useState(false)

  const handleUpvoteClick = async () => {
    if (!hasUpvoted) {
      await handleUpvote();
      setHasUpvoted(true)
      setHasDownvoted(false)
    }
  };

  const handleDownvoteClick = async () => {
    if (!hasDownvoted) {
      await handleDownvote();
      setHasDownvoted(true)
      setHasUpvoted(false)
    }
  };

  return (
    <div className={styles.voteManager}>
      <button onClick={handleUpvoteClick} disabled={hasUpvoted}>
      👍
      </button>
      <span>{votes?.upvotes || 0}</span>
      <button onClick={handleDownvoteClick} disabled={hasDownvoted}>
        👎
      </button>
      <span>{votes?.downvotes || 0}</span>
    </div>
  );
};
export default VoteManager;