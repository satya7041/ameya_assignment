// File: app/admin/create-participant.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreateParticipant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState<any[]>([]);  // State to hold the list of users
  const [selectedUser, setSelectedUser] = useState<any | null>(null);  // Track selected user
  const router = useRouter();

  // Fetch users from MongoDB when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/get-users');  // Make sure this API exists
        const data = await response.json();
        setUsers(data);  // Set the users to state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      alert('Please select a user');
      return;
    }

    // Send data to API to create participant
    const res = await fetch('/api/admin/create-participant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      }),
    });

    if (res.ok) {
      alert('Participant created successfully');
      router.push('/admin/manage-participants');  // Redirect to the manage participants page
    } else {
      alert('Error creating participant');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Create Participant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Select User</label>
          <select
            id="user"
            value={selectedUser ? selectedUser._id : ''}
            onChange={(e) => {
              const user = users.find(u => u._id === e.target.value);
              setSelectedUser(user || null);
            }}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
            required
          >
            <option value="">Select a User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={selectedUser ? selectedUser.email : email}
            readOnly
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            id="role"
            value={selectedUser ? selectedUser.role : role}
            readOnly
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Create Participant
        </button>
      </form>
    </div>
  );
};

export default CreateParticipant;
