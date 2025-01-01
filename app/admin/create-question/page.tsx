"use client";
import React, { useEffect, useState } from 'react';

const CreateQuestion = () => {
  const [question, setQuestion] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [participants, setParticipants] = useState<any[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null); // Store full participant data

  // Fetch participants when the component mounts
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('/api/admin/create-participant');
        if (!response.ok) {
          throw new Error('Failed to fetch participants');
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!question || !selectedParticipant) {
      alert('Please enter a question or select a participant');
      return;
    }

   
    // Sending correct data to the backend
    const questionData = {
      question,
      name: selectedParticipant.name,  // Name of the participant
      role: selectedParticipant.role,  // Role of the participant
    };

    try {
      const response = await fetch('/api/admin/create-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        setSuccessMessage('Question created successfully!');
        setQuestion('');
        setSelectedParticipant(null); // Reset participant selection
      } else {
        alert('Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Create Question</h1>

      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="participant" className="block text-sm font-medium text-gray-700">Select Participant</label>
          <select
            id="participant"
            name="participant"
            value={selectedParticipant ? selectedParticipant._id : ''}
            onChange={(e) => {
              const selected = participants.find(p => p._id === e.target.value);
              setSelectedParticipant(selected || null);
            }}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Participant</option>
            {participants.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name} - {participant.role}
              </option>
            ))}
          </select>

          <label htmlFor="question" className="block text-sm font-medium text-gray-700">Appraisal Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Create Question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
