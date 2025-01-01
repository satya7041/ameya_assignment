// File: models/Question.ts

import mongoose from 'mongoose';

// Define the schema for a Question
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true, // Optionally make the question unique
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  participantId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserMapping', // Reference to the UserMapping model (or participants model)
    required: true,
  },
}, { timestamps: true });

// Create and export the Question model
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default Question;
