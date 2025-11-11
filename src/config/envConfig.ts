import * as z from "zod";

export const ENV = z.object({
  PORT: z
    .string()
    .refine((val) => !isNaN(Number(val)), { error: "Not a number" }),
  DB_URL: z.url(),
  NODE_ENV: z.string(),
  FALLBACK_HASH_GEN_STRING: z.string(),
  SESSION_SECRET: z.string(),
});

ENV.parse(process.env);

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-object-type */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof ENV> {}
  }
}
