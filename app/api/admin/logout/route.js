import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const response = NextResponse.json({success:true, message: 'Logged out successfully!' }, { status: 200 });
    
    // Clear the 'admintoken' cookie by setting its expiration to a past date
    response.cookies.set('adminToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Set expiry to past date to delete
      path: '/',
      sameSite: 'Lax',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Server error during logout.', error: error.message }, { status: 500 });
  }
}