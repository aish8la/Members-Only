import type { Request } from "express";

export const snakeCaseToCamelCase = (text: string) => {
  return text
    .split("_")
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      if (word[0]) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
};

export const keysToCamelCase = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((e) => keysToCamelCase(e));
  }

  if (Object.prototype.toString.call(obj) === "[object Object]") {
    const entries = Object.entries(obj);
    const camelCasedEntries = entries.map(([key, value]) => {
      const camelCasedKey = snakeCaseToCamelCase(key);
      const newValue = keysToCamelCase(value);
      return [camelCasedKey, newValue];
    });
    return Object.fromEntries(camelCasedEntries);
  }
  return obj;
};

export const getFormErrors = (req: Request) => {
  const formData = req.session?.formData
    ? structuredClone(req.session.formData)
    : null;
  const formErrors = req.session?.formErrors
    ? structuredClone(req.session.formErrors)
    : null;
  const roleValidationErrors = req.session?.roleValidationErrors
    ? structuredClone(req.session.roleValidationErrors)
    : null;
  req.session.formData = null;
  req.session.formErrors = null;
  req.session.roleValidationErrors = null;

  return [formData, formErrors, roleValidationErrors];
};
