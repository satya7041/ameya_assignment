
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Import DB connection utility
import Question from '../../../../models/Question'; // Import the Question model

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the incoming request body
    const { question, name, role } = await request.json();
    console.log('Received data:', { question, name, role });
    

      // Validate that the required fields are provided
      if (!question || !name || !role) {
        return NextResponse.json({ message: 'All fields (question, name, role) are required' }, { status: 400 });
      }

      // Create a new Question document
      const newQuestion = new Question({
        question,
        name,
        role,
      });

    // Save the new question to the database
    await newQuestion.save();

    // Return a success response
    return NextResponse.json({ message: 'Question created successfully' });
  } catch (error: any) {
    console.error('Error creating question:', error);
    return NextResponse.json({ message: 'Error creating question' }, { status: 500 });
  }
}
