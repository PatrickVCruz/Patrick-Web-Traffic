import React from "react";

export function Pagination({ currentPage, totalPages, changePage }) {
    return (
        <div className="pagination">
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50">
                Previous
            </button>
            <span className="mx-4 text-md font-medium text-gray-300">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50">
                Next
            </button>
        </div>
    );
}