import { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  const session = getAdminSession(request);
  if (!session) {
    return apiError('UNAUTHORIZED', 'Not authenticated', 401);
  }

  return apiSuccess({ username: session.username, authenticated: true });
}
