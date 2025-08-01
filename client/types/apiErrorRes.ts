type ErrorUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
};
type APIErrorRes = {
  success: boolean;
  message: string;
  data: { userData: ErrorUser };
};
