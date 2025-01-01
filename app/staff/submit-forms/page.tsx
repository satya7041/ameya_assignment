
"use client";
import React, { useState, useEffect } from "react";

const SubmitForms = () => {
  const [formData, setFormData] = useState({ feedback: "", rating: "" });
  const [mappedData, setMappedData] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>(""); // State to store selected role (supervisor, peer, junior)
  const [selectedPeerOrJunior, setSelectedPeerOrJunior] = useState<any | null>(null); // To store selected peer or junior

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await fetch("/api/admin/create-participant");
      const data = await response.json();
      setParticipants(data);
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    const fetchMappedData = async () => {
      if (!selectedParticipant) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/staff/get-questions?participantId=${selectedParticipant._id}`);
        const data = await response.json();
        setMappedData(data);
      } catch (error) {
        console.error("Error fetching mapped data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMappedData();
  }, [selectedParticipant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.feedback || !formData.rating) {
      alert("Please fill out all fields");
      return;
    }

    const response = await fetch("/api/staff/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: formData.feedback,
        rating: formData.rating,
        participantId: selectedParticipant._id,
        mappedData: mappedData,
      }),
    });

    if (response.ok) {
      setSuccessMessage("Form submitted successfully!");
      setFormData({ feedback: "", rating: "" });
    } else {
      alert("Failed to submit the form");
    }
  };

  // Filter peers or juniors based on the role
  const filteredPeers = role === "peer" ? mappedData?.peers : [];
  const filteredJuniors = role === "junior" ? mappedData?.juniors : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Form</h1>

      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="participant" className="block text-sm font-medium text-gray-700">
            Select Participant
          </label>
          <select
            id="participant"
            value={selectedParticipant?._id || ''}
            onChange={(e) => {
              const selected = participants.find((p) => p._id === e.target.value);
              setSelectedParticipant(selected);
            }}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Participant</option>
            {participants.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name} ({participant.role})
              </option>
            ))}
          </select>
        </div>

        {/* Role selection (Supervisor, Peer, Junior) */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Select Your Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setSelectedPeerOrJunior(null); // Reset selected peer or junior when role changes
            }}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Role</option>
            <option value="supervisor">Supervisor</option>
            <option value="peer">Peer</option>
            <option value="junior">Junior</option>
          </select>
        </div>

        {/* Conditionally render the peer or junior dropdown */}
        {(role === "peer" || role === "junior") && (
          <div>
            <label htmlFor="peerOrJunior" className="block text-sm font-medium text-gray-700">
              Select {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
            <select
              id="peerOrJunior"
              value={selectedPeerOrJunior?._id || ""}
              onChange={(e) => {
                const selected =
                  role === "peer"
                    ? filteredPeers.find((p: any) => p._id === e.target.value)
                    : filteredJuniors.find((j: any) => j._id === e.target.value);
                setSelectedPeerOrJunior(selected);
              }}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
            >
              <option value="">Select {role.charAt(0).toUpperCase() + role.slice(1)}</option>
              {(role === "peer" ? filteredPeers : filteredJuniors).map((item: any) => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.role})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Show mapped data based on the selected role */}
        {mappedData && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Mapped Data</h3>

            {/* Render supervisor if available */}
            {mappedData.supervisor && role === "supervisor" && (
              <div>
                <strong>Supervisor:</strong> {mappedData.supervisor.name} ({mappedData.supervisor.role})
              </div>
            )}

            {/* Render peers if role is 'peer' */}
            {role === "peer" && mappedData.peers.length > 0 && (
              <div>
                <strong>Peers:</strong>
                <ul>
                  {mappedData.peers.map((peer: any) => (
                    <li key={peer._id}>
                      {peer.name} ({peer.role})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Render juniors if role is 'junior' */}
            {role === "junior" && mappedData.juniors.length > 0 && (
              <div>
                <strong>Juniors:</strong>
                <ul>
                  {mappedData.juniors.map((junior: any) => (
                    <li key={junior._id}>
                      {junior.name} ({junior.role})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            id="feedback"
            value={formData.feedback}
            onChange={(e) =>
              setFormData({ ...formData, feedback: e.target.value })
            }
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Rating</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitForms;

