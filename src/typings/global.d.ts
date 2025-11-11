export {};

declare global {
  interface IUser {
    id: number;
    emailAddress: string;
    firstName: string;
    lastName: string | null;
    password: string;
    isMember: boolean;
    isAdmin: boolean;
    joinTimestamp: Date;
  }

  type SafeUser = Omit<IUser, "password">;
  type NewUser = Omit<IUser, "id" | "joinTimestamp">;
}
