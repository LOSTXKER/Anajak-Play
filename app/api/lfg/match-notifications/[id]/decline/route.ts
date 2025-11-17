import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/lfg/match-notifications/[id]/decline
 * ปฏิเสธการจับคู่
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = params.id;

    // TODO: Get current user from session/auth
    const currentUserId = 'user-1'; // Mock user ID

    // TODO: Decline match
    // 1. Verify notification belongs to user
    // 2. Mark notification as declined
    // 3. Continue searching for other matches
    
    return NextResponse.json({
      success: true,
      message: 'ปฏิเสธการจับคู่แล้ว',
    });
  } catch (error) {
    console.error('Error declining match:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}
