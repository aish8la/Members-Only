import type { SafeUser } from "./user.ts";

declare global {
  namespace Express {
    interface User extends SafeUser {}
    interface Request {
      validatedData?: unknown;
    }
  }
}
