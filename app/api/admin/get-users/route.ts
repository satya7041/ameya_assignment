// File: app/api/admin/map-participant/route.ts

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB URI
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Fetch all participants (users) directly using native MongoDB driver
export async function GET() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db('ameya_innovax'); // Replace with your DB name
    const usersCollection = database.collection('users'); // Replace 'users' with your collection name

    // Fetch all documents (users) from the collection
    const users = await usersCollection.find({}, { projection: { name: 1,email:1,  role: 1 } }).toArray();

    // Check if no users found
    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }

    // Return the list of users
    return NextResponse.json(users, { status: 200 });

  } catch (error:any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Error fetching users', error: error.message },
      { status: 500 }
    );
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}
