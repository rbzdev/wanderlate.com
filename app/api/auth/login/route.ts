import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma/client';
import { loginSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import { createSession } from '@/lib/session';

/**
 * POST /api/auth/login
 * Authenticate user and create session
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastName: true,
        accountType: true,
        password: true,
        isActive: true,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account has been deactivated. Please contact support.',
        },
        { status: 403 }
      );
    }

    // Check if user has a password (not OAuth user)
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please use the login method you originally signed up with.',
        },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(validatedData.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Create session for the user
    await createSession(user.id);

    // Return success response (without password)
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastName: user.lastName,
          accountType: user.accountType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          success: false,
          message: firstError.message,
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    // Log error without exposing sensitive details
    console.error('Login error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during login. Please try again.',
      },
      { status: 500 }
    );
  }
}
