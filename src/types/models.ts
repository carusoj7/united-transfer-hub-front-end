/* ---------===== custom props ====--------- */
export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  transferFee: number;
  photo: string;
  upvotes: number;
  downvotes: number;
  profileId: number;
}

export interface Vote {
  id: number;
  playerId: number;
  profileId: number;
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
