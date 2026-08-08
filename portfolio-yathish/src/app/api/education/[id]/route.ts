import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { educationUpdateSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getEducationById, updateEducation, deleteEducation } from '@/services/education';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const edu = await getEducationById(id);
    if (!edu) return apiError('NOT_FOUND', 'Education record not found', 404);
    return apiSuccess(edu);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve education record', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const body = await request.json();
    const validation = educationUpdateSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await updateEducation(id, validation.data);
    if (!result.success || !result.education) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update education record', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.education);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to update education record', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const result = await deleteEducation(id);

    if (!result.success) return apiError('DELETE_FAILED', result.error || 'Failed to delete education record', 400);

    revalidatePath('/', 'layout');
    return apiSuccess({ message: 'Education record deleted successfully' });
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to delete education record', 500);
  }
}
