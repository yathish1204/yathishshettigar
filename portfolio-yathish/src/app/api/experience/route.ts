import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { experienceSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getExperiences, getAllExperiencesForAdmin, createExperience } from '@/services/experience';

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (session) {
      const all = await getAllExperiencesForAdmin();
      return apiSuccess(all);
    }
    const publicList = await getExperiences();
    return apiSuccess(publicList);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve experience records', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const validation = experienceSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await createExperience(validation.data);
    if (!result.success || !result.experience) {
      return apiError('CREATE_FAILED', result.error || 'Failed to create experience', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.experience, 201);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to create experience', 500);
  }
}
