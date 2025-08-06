import React, {useMemo, useState} from "react";
import {compareValues} from "../../utlis/sortingUtilities";
import {getTraffic} from "./services";

type TrafficData = {
    "id": number;
    "ip_address": string;
    "url": string;
    "user_agent": string;
    "time": {
        "date": string;
        "timezone_type": number;
        "timezone": string;
    }
};

type UseTrafficDataResult = {
    trafficData: TrafficData[],
    fetchTrafficData: () => void,
    error: string | null,
    isLoading: boolean;
    endTime: string;
    startTime: string;
    setStartTime: React.Dispatch<React.SetStateAction<string>>;
    setEndTime: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
/*(
** Get the traffic data
 */
export const useTrafficData = (): UseTrafficDataResult => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
    const [error, setError] = useState<string>(null);
    const [startTime, setStartTime] = useState<string>(""); // State for start_time input
    const [endTime, setEndTime] = useState(""); // State for end_time input
    const [sortKey] = useState("ip_address");
    const [sortOrder] = useState("asc");

    const sortedData = useMemo(() => {
        return [...trafficData].sort((a, b) => compareValues(a, b, sortKey, sortOrder));
    }, [trafficData, sortKey, sortOrder]);

    const fetchTrafficData = async () => {
        try {
            const data = await getTraffic({ start_time: startTime, end_time: endTime });

            setTrafficData(data);

        } catch (err) {
            console.error("Error fetching traffic data:", err);
            setError("Failed to load traffic data");
        } finally {
            setLoading(false);
        }

    }

    return {
        fetchTrafficData,
        trafficData: sortedData,
        error,
        isLoading,
        endTime,
        startTime,
        setStartTime,
        setEndTime,
        setLoading
    };
}
