import Link from "next/link";


export default function Home() {
  return (
    <div>
      <p className="text-2xl font-semibold flex justify-center items-center">Welcome to Appraisal System</p>
      <div className="flex space-x-4 mb-6 justify-center">

        <Link
          className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"

          href="/admin">Admin Dashboard</Link>
        <Link
          className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"

          href="/staff">Staff Dashboard</Link>
      </div>
    </div>
  );
}
