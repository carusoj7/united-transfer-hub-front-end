//npm modules
import { useState } from "react";
//types
import { Vote } from "../../types/models";


  interface VoteProps {
    vote: Vote | null;
    handleUpvote: () => Promise<void>;
    handleDownvote: () => Promise<void>;
  }
  

const VoteManager = (props: VoteProps): JSX.Element => {
  const { vote, handleUpvote, handleDownvote } = props
  const [hasVoted, setHasVoted] = useState(vote !== null);
  const [upvotes, setUpvotes] = useState(vote?.upvotes || 0);
  const [downvotes, setDownvotes] = useState(vote?.downvotes || 0);

  const handleUpvoteClick = () => {
    if (hasVoted) {
      handleDownvote();
      setUpvotes(upvotes + 1);
      setDownvotes(downvotes - 1);
    } else {
      handleUpvote();
      setUpvotes(upvotes + 1);
      setHasVoted(true);
    }
  };

  const handleDownvoteClick = () => {
    if (hasVoted) {
      handleUpvote();
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
    } else {
      handleDownvote();
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