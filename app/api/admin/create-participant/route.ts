// File: app/api/admin/create-participant/route.ts

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Import DB connection utility
import Participant from '../../../../models/Participant'; // Import the Participant model

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the incoming request body to get participant data
    const { name, email, role } = await request.json();

    // Validate the input fields
    if (!name || !email || !role) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Create a new Participant document
    const newParticipant = new Participant({
      name,
      email,
      role,
    });

    // Save the new participant to the database
    await newParticipant.save();

    // Return a success response
    return NextResponse.json({ message: 'Participant created successfully' });
  } catch (error) {
    console.error('Error creating participant:', error);
    return NextResponse.json({ message: 'Error creating participant' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    // Fetch all users from the users collection
    const users = await Participant.find();

    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }

    // Return the list of users (to be used for mapping)
    return NextResponse.json(users); 
  } catch (error) {
    console.error('Error fetching users for mapping:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
