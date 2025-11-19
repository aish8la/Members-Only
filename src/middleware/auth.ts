import type { RequestHandler } from "express";
import type {
  AuthMiddleware,
  CheckFunction,
  CheckFunctionObject,
} from "./authTypes.js";
import passport from "passport";
import { ForbiddenError } from "../errors/customErrors.js";

export const authenticate: RequestHandler = async (req, res, next) => {
  const passportAuthenticateCb: passport.AuthenticateCallback = (
    err,
    user,
    info
  ) => {
    if (err) return next(err);
    if (!user) {
      return res.render("authentication/login", {
        errors: info,
      });
    }
    /**
     * This is to make sure that session is saved before redirect
     */
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        return res.redirect("/");
      });
    });
  };
  const authenticateFb = passport.authenticate("local", passportAuthenticateCb);
  authenticateFb(req, res, next);
};

export const checkAuthStatus = () => {
  const checks: CheckFunctionObject[] = [];
  const middleware: AuthMiddleware = (req, res, next) => {
    const isAuthenticated = req?.isAuthenticated() ?? false;
    if (!isAuthenticated) {
      return res.redirect("/auth/login");
    }

    for (const fn of checks) {
      const passed = fn.checkFn(req);
      if (passed) continue;

      if (fn.failHandler) {
        return fn.failHandler(req, res, next);
      }

      const err = new ForbiddenError();
      return next(err);
    }
    return next();
  };

  const addMemberCheck = () => {
    const checkFn: CheckFunction = (reqObj) => {
      const isMember =
        (reqObj.user?.isMember ?? false) || (reqObj?.user?.isAdmin ?? false); // Consider as member if it is an administrator
      return isMember;
    };
    const failHandler: RequestHandler = (req, res, next) => {
      const err = new ForbiddenError(
        "Membership is required to access this resource"
      );
      next(err);
    };
    checks.push({ checkFn, failHandler });
    return middleware;
  };

  const addAdminCheck = () => {
    const checkFn: CheckFunction = (reqObj) => {
      const isAdmin = reqObj.user?.isAdmin ?? false;
      return isAdmin;
    };
    const failHandler: RequestHandler = (req, res, next) => {
      const err = new Error("You are not authorized to access this resource");
      next(err);
    };
    checks.push({ checkFn, failHandler });
    return middleware;
  };

  middleware.isMember = addMemberCheck;
  middleware.isAdmin = addAdminCheck;
  return middleware;
};
