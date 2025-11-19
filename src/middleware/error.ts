import type { ErrorRequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (!err?.statusCode) {
    err.statusCode = 500;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err);
    return res.render("error", {
      error: err,
    });
  }

  if (err?.isOperational) {
    return res.status(err.statusCode).render("error", {
      error: err,
    });
  }

  console.error(err);
  err.message = "Something went wrong.";
  return res.status(err.statusCode).render("error", {
    error: err,
  });
};
