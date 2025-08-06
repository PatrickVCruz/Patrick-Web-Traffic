import React from "react";
import {SortBy} from "../../../domain/common/constants";

export function TrafficList({trafficData, sortKey, sortOrder, changeSorting}) {
    const TABLE_HEADER_CLASSES = "border-b border-[#515658] px-8 py-5 cursor-pointer group hover:text-[#ffffff]";
    const TABLE_CELL_CLASSES = "border-b border-[#515658] px-8 py-4 text-[#a9b7c6]";
    const TableHeader = ({title, columnKey}) => (
        <th
            onClick={() => changeSorting(columnKey)}
            className={TABLE_HEADER_CLASSES}>
            <span className="flex items-center gap-2">
                {title}
                {sortKey === columnKey && <span>{sortOrder === SortBy.ASC ? "↑" : "↓"}</span>}
            </span>
        </th>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#2b2b2b]">
            <div className="overflow-x-auto bg-[#313335] shadow-md rounded-lg">
                <table className="table-auto w-full text-sm text-left border-collapse">
                    <thead className="bg-[#3c3f41] text-[#a9b7c6] text-sm uppercase font-semibold">
                    <tr>
                        <TableHeader title="IP Address" columnKey="ip_address"/>
                        <TableHeader title="URL" columnKey="url"/>
                        <TableHeader title="User Agent" columnKey="user_agent"/>
                        <TableHeader title="Time" columnKey="time"/>
                    </tr>
                    </thead>
                    <tbody>
                    {trafficData.map((item, index) => {
                        const {ip_address, url, user_agent, time} = item;

                        return (
                            <tr key={item.id || index}
                                className={`${
                                    index % 2 === 0 ? "bg-[#3c3f41]" : "bg-[#2b2b2b]"
                                } hover:bg-[#4e5254]`}>
                                <td className={TABLE_CELL_CLASSES}>{ip_address}</td>
                                <td className={TABLE_CELL_CLASSES}>{url}</td>
                                <td className={TABLE_CELL_CLASSES}>{user_agent}</td>
                                <td className={TABLE_CELL_CLASSES}>
                                    {time?.date}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}