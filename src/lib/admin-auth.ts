import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "pdf_admin";

const ADMIN_TOKEN_SALT = "innovo-admin-v1";

export function getAdminPassphrase(): string | undefined {
  return process.env.ADMIN_PASSPHRASE?.trim() || undefined;
}

export function createAdminToken(): string | null {
  const secret = getAdminPassphrase();
  if (!secret) return null;
  return createHmac("sha256", secret).update(ADMIN_TOKEN_SALT).digest("base64url");
}

export function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = createAdminToken();
  if (!expected) return false;

  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassphrase(candidate: string): boolean {
  const secret = getAdminPassphrase();
  if (!secret) return false;

  try {
    const a = Buffer.from(candidate);
    const b = Buffer.from(secret);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
