const TABLE_HEADERS = [
    "IP Address",
    "URL",
    "Session ID",
    "User Agent",
    "Time",
];

export function TrafficDetails({trafficItem}) {
    const {ip_address, url, session_id, user_agent, time} = trafficItem;

    const renderTrafficRow = () => (
        <tr>
            <td className="border border-gray-300 px-4 py-2">{ip_address}</td>
            <td className="border border-gray-300 px-4 py-2">{url}</td>
            <td className="border border-gray-300 px-4 py-2">{session_id}</td>
            <td className="border border-gray-300 px-4 py-2">{user_agent}</td>
            <td className="border border-gray-300 px-4 py-2">
                {time.date} ({time.timezone}) ({time.timezone_type})
            </td>
        </tr>
    );

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full text-sm text-center font-sans">
                <thead>
                <tr className="bg-gray-200 text-gray-700 font-bold">
                    {TABLE_HEADERS.map((header) => (
                        <th key={header} className="border border-gray-400 px-4 py-2">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>{renderTrafficRow()}</tbody>
            </table>
        </div>
    );
}
