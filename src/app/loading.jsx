import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const PRIMARY_COLOR = "#816c4d";

const loading = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
            <FadeLoader color={PRIMARY_COLOR} />
            <p className="text-sm text-gray-500">
                Loading your bookings...
            </p>
        </div>
    );
};

export default loading;