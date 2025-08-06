export type Time = {
    "date": string;
    "timezone_type": number;
    "timezone": string;
}


export type TrafficData = {
        "id": number;
        "ip_address": string;
        "url": string;
        "user_agent": string;
        "time": Time
    };