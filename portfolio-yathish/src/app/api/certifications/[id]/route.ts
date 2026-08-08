import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { certificationUpdateSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getCertificationById, updateCertification, deleteCertification } from '@/services/certifications';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const cert = await getCertificationById(id);
    if (!cert) return apiError('NOT_FOUND', 'Certification not found', 404);
    return apiSuccess(cert);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to retrieve certification', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const body = await request.json();
    const validation = certificationUpdateSchema.safeParse(body);

    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', msg, 400);
    }

    const result = await updateCertification(id, validation.data);
    if (!result.success || !result.certification) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update certification', 400);
    }

    revalidatePath('/', 'layout');
    return apiSuccess(result.certification);
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to update certification', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { id } = await params;
    const result = await deleteCertification(id);

    if (!result.success) return apiError('DELETE_FAILED', result.error || 'Failed to delete certification', 400);

    revalidatePath('/', 'layout');
    return apiSuccess({ message: 'Certification deleted successfully' });
  } catch (error) {
    return apiError('SERVER_ERROR', 'Failed to delete certification', 500);
  }
}
