"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GET } from "./query/route.js";
import { TrafficListContainer } from "./ui/components/TrafficTableContainer";

export default function Page() {
    const [trafficData, setTrafficData] = useState([]);
    const [sortKey] = useState("ip_address");
    const [sortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GET();
                setTrafficData(data);
            } catch (err) {
                console.error("Error fetching traffic data:", err);
                setError("Failed to load traffic data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const sortedData = useMemo(() => {
        return [...trafficData].sort((a, b) => {
            const valA = a[sortKey]?.toString().toLowerCase() || "";
            const valB = b[sortKey]?.toString().toLowerCase() || "";
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [trafficData, sortKey, sortOrder]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p>Loading traffic data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Traffic Data</h1>
                <TrafficListContainer trafficData={sortedData} />
            </main>
        </div>
    );
}