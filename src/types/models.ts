/* ---------===== custom props ====--------- */
export interface Player {
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
