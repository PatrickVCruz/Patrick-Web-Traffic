const TRAFFIC_API_URL = 'http://127.0.0.1:8000/all-traffic';

async function fetchTrafficData() {
    const response = await fetch(TRAFFIC_API_URL);
    return response.json();
}

function TrafficDetails({ trafficItem }) {
    const styles = {
        container: {
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, Helvetica, sans-serif',
        },
        paragraph: {
            margin: '8px 0',
            color: '#333',
            fontSize: '14px',
        },
        label: {
            color: '#555',
        },
    };

    return (
        <table style={styles.container}>
            <tbody>
            <tr style={styles.paragraph}>
                <td style={styles.label}><strong>IP Address:</strong></td>
                <td>{trafficItem.ip_address}</td>
            </tr>
            <tr style={styles.paragraph}>
                <td style={styles.label}><strong>URL:</strong></td>
                <td>{trafficItem.url}</td>
            </tr>
            <tr style={styles.paragraph}>
                <td style={styles.label}><strong>Session ID:</strong></td>
                <td>{trafficItem.session_id}</td>
            </tr>
            <tr style={styles.paragraph}>
                <td style={styles.label}><strong>User Agent:</strong></td>
                <td>{trafficItem.user_agent}</td>
            </tr>
            <tr style={styles.paragraph}>
                <td style={styles.label}><strong>Time:</strong></td>
                <td>{trafficItem.time.date} ({trafficItem.time.timezone})</td>
            </tr>
            </tbody>
        </table>
    );
}

export default async function Page() {
    const trafficData = await fetchTrafficData();

    return (
        <>
            <h1>Page</h1>
            <script src="/traffic-checker.js"></script>
            {trafficData.map((trafficItem) => (
                <TrafficDetails key={trafficItem.id} trafficItem={trafficItem}/>
            ))}
        </>
    );
}