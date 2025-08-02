import React from "react";

function TimeRangeSelector({ startTime, setStartTime, endTime, setEndTime, fetchData, isDisabled }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Select Time Range</h2>
            <div className="flex-row">
                {/* Start Time */}
                <div className="flex-1 min-w-[200px]">
                    <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                    </label>
                    <div className="relative">
                        <input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full text-center border border-gray-400 rounded-md shadow-md px-3 py-2 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition"
                        />
                    </div>
                </div>

                {/* End Time */}
                <div className="flex-1 min-w-[200px]">
                    <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                    </label>
                    <div className="relative">
                        <input
                            id="endTime"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full text-center border border-gray-400 rounded-md shadow-md px-3 py-2 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition"
                        />
                    </div>
                </div>

                {/* Fetch Data Button */}
                <div className="flex items-end">
                    <button
                        onClick={fetchData}
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-md transition duration-150 ease-in-out ${
                            isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isDisabled}>
                        Fetch Data
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TimeRangeSelector;