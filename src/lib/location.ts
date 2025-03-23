interface ReverseGeocodingResponse {
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country?: string;
    };
}

async function reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodingResponse> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch location data");
    }

    return response.json();
}

async function getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        }
    });
}

export async function fetchUserCityAndState() {
    try {
        // Get user's geolocation
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;

        // Reverse geocode to get city and state
        const locationData = await reverseGeocode(latitude, longitude);
        const city = locationData.address.city || locationData.address.town || locationData.address.village;
        const state = locationData.address.state;
        console.log(city, state);
        return { city, state };
    } catch (error) {
        console.error("Error fetching user location:", error);
    }
}

