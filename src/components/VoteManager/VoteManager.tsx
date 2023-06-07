import { useState, useEffect } from "react";
import { Player, Profile } from "../../types/models";

interface VoteProps {
  player: Player;
  profileId: number
  handleUpvote: () => Promise<void>;
  handleDownvote: () => Promise<void>;
}

const VoteManager = (props: VoteProps): JSX.Element => {
  const { player, profileId, handleUpvote, handleDownvote } = props
  const [hasVoted, setHasVoted] = useState(false)
  const [upvotes, setUpvotes] = useState(player.upvotes)
  const [downvotes, setDownvotes] = useState(player.downvotes)

  useEffect(() => {
    setUpvotes(player.upvotes)
    setDownvotes(player.downvotes)
  }, [player.upvotes, player.downvotes])

  const handleUpvoteClick = async () => {
    console.log(hasVoted, "you have voted");
    console.log(profileId);
    
    
    if (!hasVoted) {
      await handleUpvote()
      setUpvotes((prevUpvotes) => prevUpvotes + 1)
      setHasVoted(true)
    }
  };

  const handleDownvoteClick = async () => {
    if (!hasVoted) {
      await handleDownvote()
      setDownvotes((prevDownvotes) => prevDownvotes + 1)
      setHasVoted(true)
    }
  };

  return (
    <div>
      <button onClick={handleUpvoteClick} disabled={hasVoted}>
        Upvote
      </button>
      <button onClick={handleDownvoteClick} disabled={hasVoted}>
        Downvote
      </button>
      <span>Upvotes: {upvotes}</span>
      <span>Downvotes: {downvotes} </span>
      {hasVoted}
    </div>
  );
};

export default VoteManager;