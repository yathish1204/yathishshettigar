import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/api-response';
import { getProjectBySlug } from '@/services/projects';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return apiError('NOT_FOUND', `Project with slug "${slug}" not found`, 404);
    }

    return apiSuccess(project);
  } catch (error) {
    console.error('GET /api/projects/slug/[slug] error:', error);
    return apiError('SERVER_ERROR', 'Failed to retrieve project by slug', 500);
  }
}
