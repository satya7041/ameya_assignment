// File: app/admin/create-participant.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ManageParticipant = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !role) {
            alert('Please fill out all fields');
            return;
        }

        // Send data to API to create participant
        const res = await fetch('/api/admin/create-participant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, role }),
        });

        if (res.ok) {
            alert('Participant created successfully');
            router.push('/admin/manage-participants'); // Redirect to the manage participants page
        } else {
            alert('Error creating participant');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Participants</h1>
            <div className='flex space-x-4 mb-6'>

            <Link
                className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                
                href="manage-participants/create-participant">Create Participant</Link>
            <Link
                className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                
                href="manage-participants/map-participant">Map Participant</Link>
                </div>
        </div>
    );
};

export default ManageParticipant;
