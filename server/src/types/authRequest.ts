import { Request } from "express";

export interface JWTDecoded {
  id: string;
  email: string;
}
export interface AuthRequest<TBody = unknown> extends Request<{}, any, TBody> {
  cookies: { [key: string]: string };
  params: {
    id?: string;
    [key: string]: string | undefined;
  };
  userData?: JWTDecoded;
}
