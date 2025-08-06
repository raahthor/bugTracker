import { Request } from "express";

export interface JWTDecoded {
  id: string;
  email: string;
}
export interface AuthRequest extends Request {
  userData?: JWTDecoded;
}
