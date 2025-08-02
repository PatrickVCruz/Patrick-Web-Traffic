import React, { useState } from "react";
import { TrafficList } from "./TrafficList";
import { Pagination } from "./PaginationComponent";

export function TrafficListContainer({ trafficData }) {
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    const changeItemsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <>
            <div className="pagination-options">
                <label htmlFor="items-per-page">Items per page: </label>
                <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={changeItemsPerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

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
