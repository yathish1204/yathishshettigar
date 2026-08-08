import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { profileSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getProfile, updateProfile } from '@/services/profile';

export async function GET() {
  try {
    const profile = await getProfile();
    return apiSuccess(profile);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve profile', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await updateProfile(validation.data);
    if (!result.success || !result.profile) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update profile', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.profile);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to update profile', 500);
  }
}
