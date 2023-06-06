//npm modules

//types
import { Vote } from "../../types/models";

interface VoteProps {
  vote?: Vote
  handleUpvote: (vote?: Vote) => void
  handleDownvote: (vote?: Vote) => void
}

const VoteManager = (props: VoteProps): JSX.Element => {
  const { vote, handleUpvote, handleDownvote } = props
  return (
    <div>
      <button onClick={() => handleUpvote(vote)}>Upvote</button>
      <button onClick={() => handleDownvote(vote)}>Downvote</button>
      <span>Upvotes: {vote?.upvotes}</span>
      <span>Downvotes: {vote?.downvotes}</span>
    </div>
  )
}

export default VoteManager