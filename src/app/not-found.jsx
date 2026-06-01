import Link from "next/link";

const notFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-7xl font-bold text-[#816c4d]">404</h1>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            <p className="mt-2 text-gray-500 max-w-md">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link
                href="/"
                className="mt-6 bg-[#816c4d] text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-[#6e5c42]"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default notFound;