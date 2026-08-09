import { test, expect } from '@playwright/test';

test.describe('Backend API & Auth Workflows', () => {
  let adminCookie: string | null = null;
  let testProjectId: string | null = null;
  const testSlug = `test-automation-project-${Date.now()}`;

  test('Public GET /api/projects should return published projects', async ({ request }) => {
    const response = await request.get('/api/projects');
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
  });

  test('Unauthenticated POST /api/projects should return 401 Unauthorized', async ({ request }) => {
    const response = await request.post('/api/projects', {
      data: {
        title: 'Unauthorized Test Project',
        slug: 'unauthorized-project',
        shortDescription: 'Short description for unauthorized test',
        description: 'Detailed description for unauthorized test project',
        role: 'Developer',
        year: 2025,
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
        technologies: ['TypeScript'],
        status: 'draft',
      },
    });

    expect(response.status()).toBe(401);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('UNAUTHORIZED');
  });

  test('Admin POST /api/admin/login should set session cookie', async ({ request }) => {
    const response = await request.post('/api/admin/login', {
      data: {
        username: process.env.ADMIN_USERNAME || 'Yathish1234',
        password: process.env.ADMIN_PASSWORD || 'Yathish@Yathish1234',
      },
    });

    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.authenticated).toBe(true);

    const headers = response.headers();
    const setCookie = headers['set-cookie'];
    expect(setCookie).toContain('admin_session_token');

    if (setCookie) {
      adminCookie = setCookie.split(';')[0];
    }
  });

  test('Authenticated Admin POST /api/projects should create draft project', async ({ request }) => {
    const response = await request.post('/api/projects', {
      headers: {
        Cookie: adminCookie || '',
      },
      data: {
        title: 'Automation Test Project',
        slug: testSlug,
        shortDescription: 'Short description for automation test project',
        description: 'Comprehensive description for testing draft and publish workflow.',
        role: 'Test Engineer',
        client: 'Automation Corp',
        duration: '1 Month',
        year: 2025,
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
        technologies: ['Next.js', 'Playwright'],
        status: 'draft',
        order: 99,
      },
    });

    expect(response.status()).toBe(201);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.slug).toBe(testSlug);
    expect(json.data.status).toBe('draft');
    testProjectId = json.data._id;
  });

  test('Unauthenticated public query for draft project slug should return 404', async ({ request }) => {
    const response = await request.get(`/api/projects/slug/${testSlug}`);
    expect(response.status()).toBe(404);
  });

  test('Authenticated Admin PATCH /api/projects/[id] should publish project', async ({ request }) => {
    if (!testProjectId) test.skip();

    const response = await request.patch(`/api/projects/${testProjectId}`, {
      headers: {
        Cookie: adminCookie || '',
      },
      data: {
        status: 'published',
        featured: true,
      },
    });

    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.status).toBe('published');
  });

  test('Public query for published project slug should now succeed', async ({ request }) => {
    const response = await request.get(`/api/projects/slug/${testSlug}`);
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.slug).toBe(testSlug);
  });

  test('Authenticated Admin DELETE /api/projects/[id] should delete test project', async ({ request }) => {
    if (!testProjectId) test.skip();

    const response = await request.delete(`/api/projects/${testProjectId}`, {
      headers: {
        Cookie: adminCookie || '',
      },
    });

    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
  });
});
