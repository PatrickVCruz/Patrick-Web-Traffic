const TRAFFIC_API_URL = 'http://127.0.0.1:8000/';

export async function getTraffic(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${TRAFFIC_API_URL}traffic?${queryParams}`);
    return response.json();

}

export async function getAllTraffic() {
    const response = await fetch(TRAFFIC_API_URL + 'all-traffic');
    return response.json();
}