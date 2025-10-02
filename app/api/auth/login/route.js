import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ msg: 'Please enter all fields' }, { status: 400 });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'Lax',
      maxAge: 60 * 60, // 1 hour
    };

    const response = NextResponse.json({
      msg: 'Logged in successfully!',
      success:true,
      user: {
        id: user._id,
        name: user.name,  // fixed: use "name" instead of "username"
        email: user.email,
        role: user.role,
      },
    }, { status: 200 });


      // 🔑  user token//
    const token = jwt.sign(
      { id: user._id, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
// Always set normal token
    response.cookies.set('token', token, cookieOptions);
    

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { msg: 'Server error during login.', error: error.message },
      { status: 500 }
    );
  }
}
