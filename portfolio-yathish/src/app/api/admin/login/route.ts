import { NextRequest } from 'next/server';
import { adminLoginSchema } from '@/lib/validations';
import { signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = adminLoginSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', errorMsg, 400);
    }

    const { username, password } = validation.data;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('ADMIN_USERNAME or ADMIN_PASSWORD environment variable is not configured');
      return apiError('SERVER_ERROR', 'Admin credentials not configured in environment', 500);
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return apiError('UNAUTHORIZED', 'Invalid username or password', 401);
    }

    const token = signAdminToken(username);

    const response = apiSuccess({ username, authenticated: true });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60, // 2 hours session timeout
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return apiError('SERVER_ERROR', 'Internal server error during login', 500);
  }
}
