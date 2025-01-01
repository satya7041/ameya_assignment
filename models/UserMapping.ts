import mongoose from 'mongoose';
import User from './User'; // Import User model

// Schema for storing the participant mappings
const UserMappingSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const UserMapping = mongoose.models.UserMapping || mongoose.model('UserMapping', UserMappingSchema);

export default UserMapping;
