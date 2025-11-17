import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/lfg/match-notifications/[id]/accept
 * ยอมรับการจับคู่
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = params.id;

    // TODO: Get current user from session/auth
    const currentUserId = 'user-1'; // Mock user ID

    // TODO: Accept match and join session
    // 1. Verify notification belongs to user
    // 2. Add user to session
    // 3. Mark notification as accepted
    // 4. Notify other players
    
    return NextResponse.json({
      success: true,
      message: 'เข้าร่วม Session สำเร็จ',
    });
  } catch (error) {
    console.error('Error accepting match:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}
