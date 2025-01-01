

"use client"
import React, { useState, useEffect } from 'react';

const MapParticipant = () => {
  const [participants, setParticipants] = useState<any[]>([]); // Store all participants
  const [getParticipants, setGetParticipants] = useState<any[]>([]); // Store all participants
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null); // Selected participant
  const [supervisor, setSupervisor] = useState<any | null>(null); // Supervisor object (name, email, role)
  const [peer, setPeer] = useState<any[]>([]); // Peers array (name, email, role)
  const [junior, setJunior] = useState<any[]>([]); // Juniors array (name, email, role)

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await fetch('/api/admin/map-participant'); // Adjust the endpoint to fetch all participants
      const response2 = await fetch('/api/admin/create-participant'); // Adjust the endpoint to fetch all participants
      const data = await response.json();
      const data2 = await response2.json();
      setParticipants(data);
      setGetParticipants(data2);
    };

    fetchParticipants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedParticipant || !supervisor) {
      alert('Please select a participant and a supervisor');
      return;
    }

    // Prepare the mapping data, including name, email, role for supervisor, peers, and juniors
    const mappingData = {
      selectedParticipant,
      supervisor,
      peer,
      junior,
    };

    console.log("Mapping Data:", mappingData); // Debugging: Log the mapping data

    try {
      const response = await fetch('/api/admin/map-participant', {  // POST to create the mapping
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappingData),
      });

      if (response.ok) {
        alert('Participant successfully mapped');
      } else {
        alert('Failed to map participant');
      }
    } catch (error) {
      console.error('Error mapping participant:', error);
      alert('Error mapping participant');
    }
  };

  // Filter only supervisors, peers, and juniors from the participants array
  const supervisors = participants.filter((participant) => participant.role === 'Supervisor');
  const peers = participants.filter((peer) => peer.role === 'Peer');
  const juniors = participants.filter((junior) => junior.role === 'Junior');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Map Participant</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="participant" className="block text-sm font-medium text-gray-700">Select Participant</label>
          <select
            id="participant"
            value={selectedParticipant || ''}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Participant</option>
            {getParticipants.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">Select Supervisor</label>
          <select
            id="supervisor"
            value={supervisor ? supervisor._id : ''}
            onChange={(e) => setSupervisor(participants.find(p => p._id === e.target.value))}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="peers" className="block text-sm font-medium text-gray-700">Select Peers</label>
          <select
            id="peers"
            value={peer.map(p => p._id)}
            onChange={(e) => {
              const selectedPeers = Array.from(e.target.selectedOptions, (option) => {
                const participant = participants.find(p => p._id === option.value);
                return participant;
              });
              setPeer(selectedPeers);
              console.log('Selected Peers:', selectedPeers);  // Log selected peers
            }}
            multiple
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            {peers.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="juniors" className="block text-sm font-medium text-gray-700">Select Juniors</label>
          <select
            id="juniors"
            value={junior.map(j => j._id)}
            onChange={(e) => {
              const selectedJuniors = Array.from(e.target.selectedOptions, (option) => {
                const participant = participants.find(p => p._id === option.value);
                return participant;
              });
              setJunior(selectedJuniors);
              console.log('Selected Juniors:', selectedJuniors);  // Log selected juniors
            }}
            multiple
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            {juniors.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Map Participant
        </button>
      </form>
    </div>
  );
};

export default MapParticipant;
