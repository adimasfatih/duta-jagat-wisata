import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "djw_admin_session";

function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "djw2026";
  const secret =
    process.env.ADMIN_SECRET ||
    "djw-walking-together-secret-key-change-in-vercel";
  return { username, password, secret };
}

function signToken(payload: string, secret: string): string {
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

function verifyToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(
  inputUser: string,
  inputPass: string
): boolean {
  const { username, password } = getAdminConfig();
  return inputUser === username && inputPass === password;
}

export function createSessionToken(): string {
  const { secret, username } = getAdminConfig();
  return signToken(`admin:${username}`, secret);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    const { secret } = getAdminConfig();
    return verifyToken(token, secret);
  } catch {
    return false;
  }
}

