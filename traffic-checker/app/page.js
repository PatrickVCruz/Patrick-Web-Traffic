"use client";

import React, {useMemo, useState} from "react";
import {GET} from "./query/route";
import {TrafficListContainer} from "./ui/components/TrafficTableContainer";
import {compareValues} from "./utlis/sortingUtilities"; //
import TimeRangeSelector from "./ui/components/TimeRangeSelector";

export default function Page() {
    const [error, setError] = useState(null);
    const [startTime, setStartTime] = useState(""); // State for start_time input
    const [endTime, setEndTime] = useState(""); // State for end_time input
    const [trafficData, setTrafficData] = useState([]);
    const [sortKey] = useState("ip_address");
    const [sortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await GET({ start_time: startTime, end_time: endTime });
            setTrafficData(data);
        } catch (err) {
            console.error("Error fetching traffic data:", err);
            setError("Failed to load traffic data");
        } finally {
            setLoading(false);
        }
    };

    const sortedData = useMemo(() => {
        return [...trafficData].sort((a, b) => compareValues(a, b, sortKey, sortOrder));
    }, [trafficData, sortKey, sortOrder]);

    return (
        <div className="bg-gray-50 min-h-screen px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Traffic Data Viewer
            </h1>

            {/* TimeRangeSelector Component */}
            <TimeRangeSelector
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                fetchData={fetchData}
                isDisabled={!startTime || !endTime}
            />

            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm font-semibold rounded-lg p-4">
                    <p>Error: {error}</p>
                </div>
            ) : sortedData.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">
                        Fetched Traffic Data
                    </h2>
                    <TrafficListContainer trafficData={sortedData} />
                </div>
            ) : (
                <p className="text-gray-500">No traffic data available.</p>
            )}
        </div>
    );
}

