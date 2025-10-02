import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // For generating JWT after successful registration
import dbConnect from '@/app/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt'

export async function POST(request) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json({ msg: 'Please enter all fields' }, { status: 400 });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ msg: 'User with this email already exists' }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ name, email, password: hashedPassword });

        // --- Generate JWT (after successful registration, user is logged in) ---
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in an HTTP-only cookie
        const cookieOptions = {
            httpOnly: true, // Prevents client-side JS from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            path: '/', // Accessible site-wide
            sameSite: 'Lax', // Protects against CSRF
        };

        const response = NextResponse.json({
            msg: 'User registered successfully!',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        }, { status: 201 }); // 201 Created

        response.cookies.set('token', token, cookieOptions); // Set the cookie

        return response;

    } catch (error) {
        console.error('Signup error:', error);
        // Handle validation errors from Mongoose
        if (error.name === 'ValidationError') {
            return NextResponse.json({ msg: error.msg }, { status: 400 });
        }
        return NextResponse.json({ msg: 'Server error during signup.', error: error.msg }, { status: 500 });
    }
}