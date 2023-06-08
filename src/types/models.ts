/* ---------===== custom props ====--------- */
export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  transferFee: number;
  photo: string;
  votesReceived?: Vote[]
  profileId: number;
}

export interface Vote {
  profileId: number;
  playerId: number;
  upvotes: number;
  downvotes: number;
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
