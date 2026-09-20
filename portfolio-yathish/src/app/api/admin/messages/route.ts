import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessageModel } from '@/models/ContactMessage';

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    const messages = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();
    const unreadCount = messages.filter((m) => !m.read).length;

    const formattedMessages = messages.map((m) => ({
      _id: m._id.toString(),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      read: Boolean(m.read),
      createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      messages: formattedMessages,
      unreadCount,
    });
  } catch (error) {
    console.error('API /api/admin/messages GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, read } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Message ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    await ContactMessageModel.findByIdAndUpdate(id, { $set: { read: Boolean(read) } });
    return NextResponse.json({ success: true, message: 'Message status updated' });
  } catch (error) {
    console.error('API /api/admin/messages PATCH error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update message status' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Message ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    await ContactMessageModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('API /api/admin/messages DELETE error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
