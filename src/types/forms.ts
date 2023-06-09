/* ---------==== custom forms ====--------- */
export interface PlayerFormData {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  transferFee: number;
  profileId: number;
}


/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
