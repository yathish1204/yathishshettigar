import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { projectSchema } from '@/lib/validations';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getPublishedProjects, getAllProjectsForAdmin, createProject } from '@/services/projects';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const all = searchParams.get('all') === 'true';
    const status = searchParams.get('status') || undefined;

    const session = getAdminSession(request);

    if (all) {
      if (!session) {
        return apiError('UNAUTHORIZED', 'Authentication required for administrative queries', 401);
      }
      const projects = await getAllProjectsForAdmin(status);
      return apiSuccess(projects);
    }

    const projects = await getPublishedProjects();
    return apiSuccess(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return apiError('SERVER_ERROR', 'Failed to retrieve projects', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return apiError('UNAUTHORIZED', 'Authentication required for mutation operations', 401);
    }

    const body = await request.json();
    const validation = projectSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || 'Validation error';
      return apiError('VALIDATION_ERROR', errorMsg, 400);
    }

    const result = await createProject(validation.data);
    if (!result.success || !result.project) {
      return apiError('CREATE_FAILED', result.error || 'Failed to create project', 400);
    }

    // Trigger Next.js cache revalidation
    revalidatePath('/', 'layout');
    revalidatePath('/projects');
    if (result.project.slug) {
      revalidatePath(`/projects/${result.project.slug}`);
    }

    return apiSuccess(result.project, 201);
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return apiError('SERVER_ERROR', 'Failed to create project', 500);
  }
}
