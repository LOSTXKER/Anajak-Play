import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/lfg/my-session
 * ดึงข้อมูล Session ปัจจุบันของผู้ใช้
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get current user from session/auth
    const currentUserId = 'user-1'; // Mock user ID

    // TODO: Query database for user's active session
    // For now, return null (no active session)
    
    return NextResponse.json({
      success: true,
      session: null,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}
