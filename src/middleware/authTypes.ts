import type { RequestHandler, Request } from "express";

export interface AuthMiddleware extends RequestHandler {
  isAdmin: () => AuthMiddleware;
  isMember: () => AuthMiddleware;
}

export type CheckFunction = (reqObj: Request) => boolean;
export type CheckFunctionObject = {
  checkFn: CheckFunction;
  failHandler?: RequestHandler;
};
