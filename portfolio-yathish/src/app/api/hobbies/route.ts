import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { hobbySchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getHobbies, getAllHobbiesForAdmin, createHobby } from '@/services/hobbies';

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (session) {
      const all = await getAllHobbiesForAdmin();
      return apiSuccess(all);
    }
    const publicList = await getHobbies();
    return apiSuccess(publicList);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve hobbies', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const validation = hobbySchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await createHobby(validation.data);
    if (!result.success || !result.hobby) {
      return apiError('CREATE_FAILED', result.error || 'Failed to create hobby', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.hobby, 201);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to create hobby', 500);
  }
}
