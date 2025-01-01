

// File: app/api/admin/map-participant/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User';  // Assuming you have a User model
import UserMapping from '@/models/UserMapping'; // Assuming you have a UserMapping model to store the mappings
import connectDB from '@/lib/db';

// Fetch all users for mapping (GET request)
export async function GET() {
  await connectDB();
  try {
    // Fetch all users from the users collection
    const users = await User.find();

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


export async function POST(req: Request) {
  const { selectedParticipant, supervisor, peer, junior } = await req.json();

  await connectDB();

  // Prepare the mapping data by extracting necessary fields (name, role, email)
  const formattedSupervisor = supervisor ? {
    _id: supervisor._id,
    name: supervisor.name,
    role: supervisor.role,
    // email: supervisor.email,
  } : null;

  const formattedPeers = peer.map((p:any) => ({
    _id: p._id,
    name: p.name,
    role: p.role,
    // email: p.email,
  }));

  const formattedJuniors = junior.map((j:any) => ({
    _id: j._id,
    name: j.name,
    role: j.role,
    // email: j.email,
  }));

  console.log("Formatted Data:", { formattedSupervisor, formattedPeers, formattedJuniors });


  try {
    // Create or update the UserMapping entry in the database
    const mapping = new UserMapping({
      participant: selectedParticipant,
      supervisor: formattedSupervisor,  // Save formatted supervisor object
      peers: formattedPeers,  // Save formatted peers array
      juniors: formattedJuniors,  // Save formatted juniors array
    });

    console.log("mapped data:", mapping);
    await mapping.save();
  

    return NextResponse.json({ message: 'Participant successfully mapped' }, { status: 201 });
  } catch (error) {
    console.error('Error saving participant mapping:', error);
    return NextResponse.json({ message: 'Error saving participant mapping' }, { status: 500 });
  }
}