type APIResonse<T = undefined> = {
  success: boolean;
  message: string;
  data: T;
};
export default APIResonse;