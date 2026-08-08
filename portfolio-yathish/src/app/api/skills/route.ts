import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { skillSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getSkills, getAllSkillsForAdmin, createSkill } from '@/services/skills';

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (session) {
      const all = await getAllSkillsForAdmin();
      return apiSuccess(all);
    }
    const publicList = await getSkills();
    return apiSuccess(publicList);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve skills', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const validation = skillSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await createSkill(validation.data);
    if (!result.success || !result.skill) {
      return apiError('CREATE_FAILED', result.error || 'Failed to create skill', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.skill, 201);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to create skill', 500);
  }
}
