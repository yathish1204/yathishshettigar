import { NextRequest, NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validations';
import { signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/api-response';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = adminLoginSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', errorMsg, 400);
    }

    const { username, password } = validation.data;

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
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return apiError('SERVER_ERROR', 'Internal server error during login', 500);
  }
}
