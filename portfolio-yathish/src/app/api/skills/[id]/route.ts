import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { skillUpdateSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getSkillById, updateSkill, deleteSkill } from '@/services/skills';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const skill = await getSkillById(id);
    if (!skill) return apiError('NOT_FOUND', 'Skill not found', 404);
    return apiSuccess(skill);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve skill', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const body = await request.json();
    const validation = skillUpdateSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await updateSkill(id, validation.data);
    if (!result.success || !result.skill) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update skill', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.skill);
  } catch (error: any) {
    console.error('Error updating skill:', error);
    return apiError('SERVER_ERROR', error?.message || 'Failed to update skill', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const result = await deleteSkill(id);

    if (!result.success) return apiError('DELETE_FAILED', result.error || 'Failed to delete skill', 400);

    revalidatePath('/', 'layout');
    return apiSuccess({ message: 'Skill deleted successfully' });
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to delete skill', 500);
  }
}
