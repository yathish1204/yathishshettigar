import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { experienceUpdateSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getExperienceById, updateExperience, deleteExperience } from '@/services/experience';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const exp = await getExperienceById(id);
    if (!exp) return apiError('NOT_FOUND', 'Experience record not found', 404);
    return apiSuccess(exp);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve experience', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const body = await request.json();
    const validation = experienceUpdateSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await updateExperience(id, validation.data);
    if (!result.success || !result.experience) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update experience', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.experience);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to update experience', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const result = await deleteExperience(id);

    if (!result.success) return apiError('DELETE_FAILED', result.error || 'Failed to delete experience', 400);

    revalidatePath('/', 'layout');
    return apiSuccess({ message: 'Experience record deleted successfully' });
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to delete experience', 500);
  }
}
