import { sanitizeUrl } from "@braintree/sanitize-url";

export const validUrl = (value: string) => {
  if (value.indexOf("://") === -1) {
    return false;
  }
  try {
    new URL(value);
  } catch (err) {
    return false;
  }
  if (value !== sanitizeUrl(value)) {
    return false;
  }
  return true;
};