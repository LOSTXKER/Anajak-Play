import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/lfg/match-notifications
 * ดึงรายการ Match Notifications ของผู้ใช้
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get current user from session/auth
    const currentUserId = 'user-1'; // Mock user ID

    // TODO: Query database for pending match notifications
    // For now, return empty array
    
    return NextResponse.json({
      success: true,
      notifications: [],
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}
