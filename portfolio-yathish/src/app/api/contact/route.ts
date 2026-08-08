import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm } from '@/services/contact';

export async function POST(request: NextRequest) {
  try {
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
