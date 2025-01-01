
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Make sure you have a connection function
import UserMapping from '@/models/UserMapping'; // Ensure correct path
import User from '../../../../models/User'; // Ensure User model is imported
import Question from '@/models/Question';

export async function GET(req: Request) {
  // Extract search parameters using nextUrl
  const { searchParams } = new URL(req.url);
  const participantId = searchParams.get('participantId');

  if (!participantId) {
    return NextResponse.json({ message: 'Participant ID is required' }, { status: 400 });
  }

  // Ensure database connection
  await connectDB();

  try {
    
    // Fetch UserMapping for the participant using populate to get related data
    const userMapping = await UserMapping.findOne({ participant: participantId })
      .populate('supervisor', 'name role email')
      .populate('peers', 'name role email')
      .populate('juniors', 'name role email')
      .exec();

    // Log the fetched data (consider removing in production)
    console.log('User Mapping Data:', userMapping);

    if (!userMapping) {
      return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
    }
    const questions = await Question.find({ participantId: participantId }).exec();

    // If no questions are found, return an empty list or message
    if (questions.length === 0) {
      return NextResponse.json({ message: 'No questions found for this participant' }, { status: 404 });
    }

  console.log('Fetched Questions:', questions);
  

    // Return the populated data
    return NextResponse.json({
      participant: userMapping.participant,
      supervisor: userMapping.supervisor,
      peers: userMapping.peers,
      juniors: userMapping.juniors,
      questions: questions, // Returning the fetched questions

    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching mapped participant:', error);
    return NextResponse.json({ message: 'Failed to fetch mapped participant', error: error.message }, { status: 500 });
  }
}
