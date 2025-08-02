import React, { useState } from "react";
import { TrafficList } from "./TrafficList";
import { Pagination } from "./PaginationComponent";

export function TrafficListContainer({ trafficData }) {
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const changeSorting = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const sortedData = [...trafficData].sort((a, b) => {
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        return 0;
    });

    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <TrafficList
                trafficData={paginatedData}
                sortKey={sortKey}
                sortOrder={sortOrder}
                changeSorting={changeSorting}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                changePage={changePage}
            />
        </>
    );
}