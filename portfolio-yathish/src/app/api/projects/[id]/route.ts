import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { projectUpdateSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getProjectById, updateProject, deleteProject } from '@/services/projects';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
      return apiError('NOT_FOUND', 'Project not found', 404);
    }

    const session = getAdminSession(request);
    if (project.status !== 'published' && !session) {
      return apiError('NOT_FOUND', 'Project not found', 404);
    }

    return apiSuccess(project);
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return apiError('SERVER_ERROR', 'Failed to retrieve project', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return apiError('UNAUTHORIZED', 'Authentication required for mutation operations', 401);
    }

    const { id } = await params;
    const body = await request.json();
    const validation = projectUpdateSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', errorMsg, 400);
    }

    const result = await updateProject(id, validation.data);
    if (!result.success || !result.project) {
      return apiError('UPDATE_FAILED', result.error || 'Failed to update project', 400);
    }

    // Trigger Next.js cache revalidation
    revalidatePath('/', 'layout');
    revalidatePath('/projects');
    if (result.project.slug) {
      revalidatePath(`/projects/${result.project.slug}`);
    }

    return apiSuccess(result.project);
  } catch (error) {
    console.error('PATCH /api/projects/[id] error:', error);
    return apiError('SERVER_ERROR', 'Failed to update project', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return apiError('UNAUTHORIZED', 'Authentication required for mutation operations', 401);
    }

    const { id } = await params;
    const existing = await getProjectById(id);
    const result = await deleteProject(id);

    if (!result.success) {
      return apiError('DELETE_FAILED', result.error || 'Failed to delete project', 400);
    }

    // Trigger Next.js cache revalidation
    revalidatePath('/', 'layout');
    revalidatePath('/projects');
    if (existing?.slug) {
      revalidatePath(`/projects/${existing.slug}`);
    }

    return apiSuccess({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error);
    return apiError('SERVER_ERROR', 'Failed to delete project', 500);
  }
}
