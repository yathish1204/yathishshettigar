import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm } from '@/services/contact';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Protection (Max 5 submissions per 10 minutes per IP)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';
    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many messages sent. Please wait a few minutes before trying again.',
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = await submitContactForm(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: result.message,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Internal server error processing contact submission.',
        },
      },
      { status: 500 }
    );
  }
}
