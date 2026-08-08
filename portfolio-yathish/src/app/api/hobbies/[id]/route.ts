import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { hobbyUpdateSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getHobbyById, updateHobby, deleteHobby } from '@/services/hobbies';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const hobby = await getHobbyById(id);
    if (!hobby) return apiError('NOT_FOUND', 'Hobby not found', 404);
    return apiSuccess(hobby);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve hobby', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const body = await request.json();
    const validation = hobbyUpdateSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await updateHobby(id, validation.data);
    if (!result.success || !result.hobby) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update hobby', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.hobby);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to update hobby', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const result = await deleteHobby(id);

    if (!result.success) return apiError('DELETE_FAILED', result.error || 'Failed to delete hobby', 400);

    revalidatePath('/', 'layout');
    return apiSuccess({ message: 'Hobby deleted successfully' });
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to delete hobby', 500);
  }
}
