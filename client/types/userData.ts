export type User = {
  id: string;
  name?: string;
  email: string;
  username?: string;
  avatar?: string;
};
type UserData = {
  userData: User;
};
export default UserData;
