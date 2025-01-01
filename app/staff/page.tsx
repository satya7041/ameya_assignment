import Link from "next/link"

const Staff = () => {
    return(
        <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
        <div className="flex space-x-4 mb-6">
            <Link
                className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"

                href="/staff/submit-forms">
                Submit Appraisal

            </Link>
            <Link
                className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                href="/staff/view-submissions">

                View Submissions

            </Link>
           
        </div>
    </div>
    )
}

export default Staff;