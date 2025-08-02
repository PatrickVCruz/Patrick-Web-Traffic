async function getVisitorData() {
    const getIPAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Failed to fetch IP address:', error);
            return 'IP unavailable';
        }
    };

    const visitorData = {
        ip_address: await getIPAddress(),
        page_url: window.location.href,
        session_id: document.referrer,
        user_agent: navigator.userAgent,
        time: new Date().toISOString().split('T')[0],
    };

    console.log('Visitor Data:', visitorData);
    return visitorData;
}

async function processVisitorData() {
    const API_URL = 'http://127.0.0.1:8000/new-visit';
    const HEADERS = {
        'Content-Type': 'application/json',
        'x-auth-token': 12345,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,

    };

    const visitorData = await getVisitorData();

    try {
        const response = await sendVisitorData(API_URL, HEADERS, visitorData);
        if (!response.ok) {
            throw new Error(`Failed to send visitor data: ${response.statusText}`);
        }
        console.log('Visitor data sent successfully');
    } catch (error) {
        console.error('Error sending visitor data:', error);
    }
}

async function sendVisitorData(url, headers, body) {
    return await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
}

processVisitorData();