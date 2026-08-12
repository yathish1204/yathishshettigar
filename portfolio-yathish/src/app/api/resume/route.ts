import { NextRequest, NextResponse } from 'next/server';
import { getProfile } from '@/services/profile';

export async function GET(request: NextRequest) {
  try {
    const profile = await getProfile();
    const resumeUrl = profile.resumeUrl || '/resume.pdf';
    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download') === 'true';

    const filename = 'Yathish_Shettigar_Resume.pdf';
    const disposition = download ? `attachment; filename="${filename}"` : `inline; filename="${filename}"`;

    // 1. If the resume is stored directly as base64 in MongoDB
    if (resumeUrl.startsWith('data:application/pdf;base64,')) {
      const base64Data = resumeUrl.substring(resumeUrl.indexOf(',') + 1);
      const buffer = Buffer.from(base64Data, 'base64');
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': disposition,
          'Content-Length': buffer.length.toString(),
        },
      });
    }

    // 2. If it's a relative URL or absolute URL
    let pdfUrl = resumeUrl;
    if (pdfUrl.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      pdfUrl = `${baseUrl}${pdfUrl}`;
    }

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF from ${pdfUrl}: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': disposition,
          'Content-Length': buffer.length.toString(),
        },
      });
    } catch (fetchErr) {
      console.error('Failed to proxy resume PDF:', fetchErr);
      // Fallback: redirect to original URL
      return NextResponse.redirect(new URL(resumeUrl, request.url));
    }
  } catch (error) {
    console.error('Error in resume API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
