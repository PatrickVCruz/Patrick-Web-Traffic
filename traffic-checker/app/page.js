"use client";

import React, {useMemo, useState} from "react";
import { GET } from "./query/route";
import { TrafficListContainer } from "./ui/components/TrafficTableContainer";
import { compareValues } from "./utlis/sortingUtilities"; //

export default function Page() {
    const [error, setError] = useState(null);
    const [startTime, setStartTime] = useState(""); // State for start_time input
    const [trafficData, setTrafficData] = useState([]);
    const [sortKey] = useState("ip_address");
    const [sortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [endTime, setEndTime] = useState(""); // State for end_time input

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
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-2xl mb-4">Traffic Data</h1>
            <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="startTime">
                    Start Time:
                </label>
                <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border rounded p-2 w-full"/>
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="endTime">
                    End Time:
                </label>
                <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border rounded p-2 w-full"/>
            </div>
            <button
                onClick={fetchData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!startTime || !endTime}>
                Fetch Data
            </button>
            {error ? (
                <p className="text-red-500 mt-4">Error: {error}</p>
            ) : sortedData ? (
                <div className="bg-gray-100 min-h-screen">
                    <main className="p-6 max-w-7xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">Traffic Data</h1>
                        <TrafficListContainer trafficData={sortedData} />
                    </main>
                </div>
            ) : (
                <p className="mt-4">Enter time range and click "Fetch Data".</p>
            )}
        </div>
    );
}
