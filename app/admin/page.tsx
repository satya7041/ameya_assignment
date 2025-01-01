// File: app/admin/page.tsx

import React, { useState } from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="flex space-x-4 mb-6">
                <Link
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"

                    href="/admin/manage-participants">
                    Manage Participants

                </Link>
                <Link
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                    href="/admin/create-question">

                    Create Questions

                </Link>
                <Link
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white" 
                    href="/admin/view-appraisals">

                    View Appraisals

                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
