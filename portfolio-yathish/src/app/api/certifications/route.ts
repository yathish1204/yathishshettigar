import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { certificationSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getCertifications, getAllCertificationsForAdmin, createCertification } from '@/services/certifications';

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (session) {
      const all = await getAllCertificationsForAdmin();
      return apiSuccess(all);
    }
    const publicList = await getCertifications();
    return apiSuccess(publicList);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve certifications', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const validation = certificationSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await createCertification(validation.data);
    if (!result.success || !result.certification) {
      return apiError('CREATE_FAILED', result.error || 'Failed to create certification', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.certification, 201);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to create certification', 500);
  }
}
