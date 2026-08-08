import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { educationSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getEducation, createEducation } from '@/services/education';

export async function GET() {
  try {
    const list = await getEducation();
    return apiSuccess(list);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve education records', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const validation = educationSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await createEducation(validation.data);
    if (!result.success || !result.education) {
      return apiError('CREATE_FAILED', result.error || 'Failed to create education record', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.education, 201);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to create education record', 500);
  }
}
