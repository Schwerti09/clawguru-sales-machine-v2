import crypto from "crypto";

const COOKIE = "claw_access";

export type AccessPayload = {
  plan: "daypass" | "pro" | "team";
  exp: number; // unix seconds
};

function secret() {
  const s = process.env.ACCESS_TOKEN_SECRET;
  if (!s || s.length < 24) throw new Error("ACCESS_TOKEN_SECRET must be set (24+ chars).");
  return s;
}

export function sign(payload: AccessPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verify(token: string): AccessPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf-8")) as AccessPayload;
    if (!payload?.exp || Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function accessCookieName() {
  return COOKIE;
}
