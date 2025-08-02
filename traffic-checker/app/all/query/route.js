const TRAFFIC_API_URL = 'http://127.0.0.1:8000/';

export async function GET() {
    const response = await fetch(TRAFFIC_API_URL + 'all-traffic');
    return response.json();
}