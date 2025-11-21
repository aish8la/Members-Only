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

export type RegisterFormValidated = NewUser & {
  [index: string]: unknown;
};

export type UserRequestParamValidated = {
  userId: number;
  [index: string]: unknown;
};

export type RequestAdminPromotion = Pick<IUser, "isAdmin"> & {
  [index: string]: unknown;
};

export type RequestMembership = {
  passphrase: string;
};

export interface IMessage {
  id: number;
  authorId: IUser["id"];
  message: string;
  createdTimestamp: Date;
}

export type NewMessage = Omit<IMessage, "messageId" | "createdTimestamp">;

export type MessageData = SafeUser & IMessage;
