export interface IUser {
  id: number;
  emailAddress: string;
  firstName: string;
  lastName: string | null;
  password: string;
  isMember: boolean;
  isAdmin: boolean;
  joinTimestamp: Date;
}

export type SafeUser = Omit<IUser, "password">;
export type NewUser = Omit<IUser, "id" | "joinTimestamp">;
