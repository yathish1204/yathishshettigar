import { NextRequest } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET || 'fallback-secret-at-least-32-chars-long';
export const ADMIN_COOKIE_NAME = 'admin_session_token';

// Simple lightweight HMAC/Token helper for admin session verification
export function signAdminToken(username: string): string {
  const payload = { username, exp: Date.now() + 24 * 60 * 60 * 1000 };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  // Simple signature check
  const signature = Buffer.from(`${encoded}:${AUTH_SECRET}`).toString('base64url').slice(0, 32);
  return `${encoded}.${signature}`;
}

export function verifyAdminToken(token?: string | null): { username: string } | null {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;
    const expectedSig = Buffer.from(`${encoded}:${AUTH_SECRET}`).toString('base64url').slice(0, 32);

    if (signature !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Date.now()) return null;

    return { username: payload.username };
  } catch (error) {
    return null;
  }
}

export function getAdminSession(request: NextRequest): { username: string } | null {
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookieToken) {
    const session = verifyAdminToken(cookieToken);
    if (session) return session;
  }

  // Authorization header fallback
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return verifyAdminToken(token);
  }

  return null;
}
