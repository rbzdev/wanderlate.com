import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session';

/**
 * POST /api/auth/logout
 * Logout user by deleting session cookie
 */
export async function POST() {
  try {
    // Delete the session cookie
    await deleteSession();

    return NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during logout',
      },
      { status: 500 }
    );
  }
}
