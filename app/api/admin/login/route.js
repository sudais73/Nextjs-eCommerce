import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ msg: 'Please enter all fields' }, { status: 400 });
    }

    // 1. Check if the submitted email matches the hardcoded ADMIN_EMAIL
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }
    
    const isMatch = (password === process.env.ADMIN_PASSWORD); 
    
    if (!isMatch) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // --- JWT and Response Setup ---
    
    const adminToken = jwt.sign(
      { 
        email: process.env.ADMIN_EMAIL, 
        role: 'admin' 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000, 
    };

    // ✅ FIXED: Returning user data (essential for frontend context)
    const response = NextResponse.json({
      msg: 'Logged in successfully!',
      success: true,
     
    }, { status: 200 });

    // Set the token
    response.cookies.set('adminToken', adminToken, cookieOptions);

    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { msg: 'Server error during admin login.', error: error.message },
      { status: 500 }
    );
  }
}