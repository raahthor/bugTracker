import * as argon2 from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 13,
    timeCost: 2,
    parallelism: 1,
  });
  return hash;
};

export const verifyPassword = async (
  hash: string,
  password: string
): Promise<boolean> => {
  const isPassword = await argon2.verify(hash, password);
  return isPassword;
};
