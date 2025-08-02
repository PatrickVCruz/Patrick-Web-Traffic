const TRAFFIC_API_URL = 'http://127.0.0.1:8000/';

export async function GET(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${TRAFFIC_API_URL}traffic?${queryParams}`);
    return response.json();
}
