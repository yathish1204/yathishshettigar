import { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/auth';
import { apiSuccess } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  const response = apiSuccess({ message: 'Logged out successfully' });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
