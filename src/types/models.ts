/* ---------===== custom props ====--------- */
export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  transferFee: number;
  profileId: number;
  photo?: string
}

export interface Vote {
  profileId: number;
  playerId: number;
  vote: number;
}

export interface VoteStatus {
  upvotes: number;
  downvotes: number;
  existingVote: Vote;
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
