export type User = {
  id: string;
  name?: string;
  email: string;
  username?: string;
  password?: string;
  avatar?: string;
};
type UserData = {
  userData: User;
};
export default UserData;
