import React from "react";
import {TrafficListContainer} from "../module/traffic/components/TrafficTableContainer";
import TimeRangeSelector from "../module/traffic/components/TimeRangeSelector";
import {useTrafficData} from "../module/traffic/hooks";

export default function Page() {

    const {trafficData, error, fetchTrafficData, setEndTime, setStartTime, startTime, endTime} = useTrafficData()

    return (
        <div className="bg-gray-50 min-h-screen px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Traffic Data Viewer
    </h1>

    <TimeRangeSelector
    startTime={startTime}
    setStartTime={setStartTime}
    endTime={endTime}
    setEndTime={setEndTime}
    fetchTrafficData={fetchTrafficData}
    isDisabled={!startTime || !endTime}
    />

    {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm font-semibold rounded-lg p-4">
            <p>Error: {error}</p>
        </div>
    ) : trafficData.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
            Fetched Traffic Data
    </h2>
    <TrafficListContainer trafficData={trafficData} />
    </div>
    ) : (
        <p className="text-gray-500">No traffic data available.</p>
    )}
    </div>
);
}

