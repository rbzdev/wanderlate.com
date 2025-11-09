import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma/client';
import { registerSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import { createSession } from '@/lib/session';

/**
 * POST /api/auth/register
 * Register a new user account
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // DEBUG == Données soumises
    // console.log('Submitting registration data:', validatedData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'A user with this email already exists',
        },
        { status: 409 }
      );
    }

    // Combine birth date parts into a single DateTime
    const birthDate = new Date(
      parseInt(validatedData.birthYear),
      parseInt(validatedData.birthMonth) - 1, // Month is 0-indexed
      parseInt(validatedData.birthDay)
    );

    // Validate birth date
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid birth date',
        },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        firstname: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        birthDay: birthDate,
        country: validatedData.country || null,
        language: validatedData.language || null,
        currency: validatedData.currency || 'EUR',
        accountType: validatedData.accountType,
        password: passwordHash,
        loginProvider: 'email',
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastName: true,
        accountType: true,
        createdAt: true,
      },
    });

    // Créer une session pour l'utilisateur nouvellement créé (optionnel)
    
    await createSession(user.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastName: user.lastName,
        },
      },
      { status: 201 }
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

    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      // Duplicate key error (shouldn't happen due to check above, but defensive)
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            success: false,
            message: 'A user with this email already exists',
          },
          { status: 409 }
        );
      }
    }

    // Log error without exposing sensitive details
    console.error('Registration error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during registration. Please try again.',
      },
      { status: 500 }
    );
  }
}
