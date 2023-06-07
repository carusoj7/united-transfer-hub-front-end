//npm modules
import { useState } from "react";
//types
import { Player } from "../../types/models";


  interface VoteProps {
    player: Player;
    handleUpvote: () => Promise<void>;
    handleDownvote: () => Promise<void>;
  }
  

const VoteManager = (props: VoteProps): JSX.Element => {
  const { player, handleUpvote, handleDownvote } = props
  const [hasVoted, setHasVoted] = useState(false);
  const [upvotes, setUpvotes] = useState(player.upvotes);
  const [downvotes, setDownvotes] = useState(player.downvotes);

  const handleUpvoteClick = async () => {
    if (!hasVoted) {
      await handleUpvote();
      setUpvotes(upvotes + 1);
      setHasVoted(true);
    }
  };

  const handleDownvoteClick = async () => {
    if (!hasVoted) {
      await handleDownvote();
      setDownvotes(downvotes + 1);
      setHasVoted(true);
    }
  };

  return (
    <div>
      <button onClick={handleUpvoteClick} disabled={hasVoted}>Upvote</button>
      <button onClick={handleDownvoteClick} disabled={hasVoted}>Downvote</button>
      <span>Upvotes: {upvotes}</span>
      <span>Downvotes: {downvotes} </span>
      {hasVoted}
    </div>
  )
}

export default VoteManager