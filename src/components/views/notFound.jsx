import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl text-red-500 font-bold">404</h1>
                <p className="text-2xl text-gray-700 mb-4">Page Not Found</p>
                <Link to ="/home" className="text-blue-500 hover:underline">Go back to the homepage</Link>
            </div>
        </div>
    );
}
