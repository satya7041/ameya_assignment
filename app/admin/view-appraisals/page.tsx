// File: app/admin/view-appraisals.tsx
"use client"
import React, { useState, useEffect } from 'react';

const ViewAppraisals = () => {
  const [appraisals, setAppraisals] = useState([]);

  useEffect(() => {
    // Fetch all appraisals
    const fetchAppraisals = async () => {
      const response = await fetch('/api/admin/view-appraisals');
      const data = await response.json();
      setAppraisals(data);
    };

    fetchAppraisals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">View Appraisals</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Participant Name</th>
            <th className="px-4 py-2 border-b">Appraisal Submitted By</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Appraisal Details</th>
          </tr>
        </thead>
        <tbody>
          {appraisals.map((appraisal:any) => (
            <tr key={appraisal._id}>
              <td className="px-4 py-2 border-b">{appraisal.participantName}</td>
              <td className="px-4 py-2 border-b">{appraisal.submittedBy}</td>
              <td className="px-4 py-2 border-b">{appraisal.role}</td>
              <td className="px-4 py-2 border-b">{appraisal.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppraisals;
