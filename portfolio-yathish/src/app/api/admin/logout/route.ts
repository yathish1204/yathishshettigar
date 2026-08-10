import { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/auth';
import { apiSuccess } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  const response = apiSuccess({ message: 'Logged out successfully' });

  // Completely invalidate and clear the session cookie across all paths
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    maxAge: 0,
    path: '/',
  });

  return response;
}
