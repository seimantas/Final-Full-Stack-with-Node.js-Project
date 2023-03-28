export type TUser = {
  _id?: string;
  age?: number;
  dateOfBirth?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  eventName?: string;
};

export type TUsers = TUser[];

export type TCreateUserForm = {
  onClose: () => void;
  onCreateUser: (newUser: TUser) => void;
  user?: TUser;
  isOpen: boolean;
};
