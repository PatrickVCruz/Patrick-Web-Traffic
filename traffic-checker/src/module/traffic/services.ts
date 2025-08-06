import {TRAFFIC_API_URL} from "../../config";
import {TrafficData} from "../../domain/traffic";

type getTrafficProps = {
    start_time: string,
    end_time: string
}

/**
 * Fetches traffic data from the traffic API based on the provided parameters.
 *
 * @param {getTrafficProps} - An object containing query parameters to filter traffic data.
 * @return {Promise<TrafficData>} A promise that resolves to the traffic data.
 */
export async function getTraffic(params: getTrafficProps): Promise<TrafficData[]>  {
    const queryParams = new URLSearchParams(params).toString();
    console.log(queryParams);
    const response = await fetch(`${TRAFFIC_API_URL}traffic?${queryParams}`);
    return response.json();
}

/**
 * Fetches all traffic data from the API.
 *
 * @return {Promise<Object>} A promise that resolves to the JSON response containing all traffic data.
 */
export async function getAllTraffic() {
    const response = await fetch(TRAFFIC_API_URL + 'all-traffic');
    return response.json();
}