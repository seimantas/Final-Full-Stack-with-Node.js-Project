import { TEvent } from "../Events/type";
import { TAdmin } from "../RegisterAdmin/type";
import { TUser } from "../UsersList/type";

export type TAppDataContext = {
  events: TEvent[];
  users: TUser[];
  admins: TAdmin[];
};
