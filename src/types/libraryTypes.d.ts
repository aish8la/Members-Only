import type { SafeUser } from "./appTypes.ts";

declare global {
  namespace Express {
    interface User extends SafeUser {}
    interface Request {
      validatedData?: unknown;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    formErrors?: unknown;
    formData?: unknown;
    roleValidationErrors?: {
      adminValidation?: string;
      memberValidation?: string;
    } | null;
  }
}
