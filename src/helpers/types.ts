import { Request as ExpressRequest, NextFunction, Response } from "express";

export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    id: number;
    username: string;
  };
}

export interface PossiblyAuthenticatedRequest extends ExpressRequest {
  user?: {
    id: number;
    username: string;
  };
}

export enum ERequestType {
  Authenticated = "Authenticated",
  Unauthenticated = "Unauthenticated",
}

export type Request<RequestType> =
  RequestType extends ERequestType.Authenticated
    ? AuthenticatedRequest
    : ExpressRequest;

export type Controller<RequestType = ERequestType.Unauthenticated> = (
  req: Request<RequestType>,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
