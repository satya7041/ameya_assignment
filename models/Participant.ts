
import mongoose from 'mongoose';

// Define the schema for a Participant
const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
  },
  role: {
    type: String,
    required: true,
    enum: ['Supervisor', 'Peer', 'Junior'], // Restrict to predefined roles
  },
}, { timestamps: true });

// Create and export the Participant model
const Participant = mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);

export default Participant;
