"use client";
import React, { useEffect, useState } from "react";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchRoleAndSubmissions = async () => {
      // Fetch role (Supervisor/Peer/Junior) and submissions from the API
      const roleResponse = await fetch("/api/staff/role");
      const roleData = await roleResponse.json();
      setRole(roleData.role);

      const submissionsResponse = await fetch("/api/staff/view-submissions");
      const submissionsData = await submissionsResponse.json();
      setSubmissions(submissionsData);
    };

    fetchRoleAndSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">View Submissions</h1>
<h1>sd</h1>
      {role === "Supervisor" && (
        <p className="text-blue-500 mb-4">You can view self-appraisals.</p>
      )}

      <div className="space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="p-4 border border-gray-300 rounded bg-white"
          >
            <h2 className="font-bold">{submission.title}</h2>
            <p>{submission.feedback}</p>
            <p className="text-sm text-gray-500">Rating: {submission.rating}</p>

            {role === "Supervisor" && submission.selfAppraisal && (
              <div className="mt-4">
                <h3 className="font-semibold">Self-Appraisal:</h3>
                <p>{submission.selfAppraisal}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSubmissions;
