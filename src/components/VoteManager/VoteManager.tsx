import { useState } from "react";
import { Player, Vote } from "../../types/models";

import styles from './VoteManager.module.css'

interface VoteProps {
  profileId: number;
  handleUpvote: () => Promise<void>;
  handleDownvote: () => Promise<void>;
  upvotes: number;
  downvotes: number;
  vote: Vote
}

const VoteManager = (props: VoteProps): JSX.Element => {
  const {  handleUpvote, handleDownvote, upvotes, downvotes, vote } = props;

  const handleUpvoteClick = async () => {
    if (vote?.vote !== 1) {
      await handleUpvote();
    }
  };

  const handleDownvoteClick = async () => {
    if (vote?.vote !== -1) {
      await handleDownvote();
    }
  };

  return (
    <div className={styles.voteManager}>
      <button onClick={handleUpvoteClick} disabled={vote?.vote === 1}>
      👍
      </button>
      <span>{upvotes}</span>
      <button onClick={handleDownvoteClick} disabled={vote?.vote === -1}>
        👎
      </button>
      <span>{downvotes}</span>
    </div>
  );
};
export default VoteManager;