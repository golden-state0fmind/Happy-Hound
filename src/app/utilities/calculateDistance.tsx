export interface Coordinates {
    lat: number;
    lng: number;
}

// Function to calculate distance using Haversine formula
export function calculateDistance(
    coordinates1: Coordinates,
    coordinates2: Coordinates
): number | null {
    if (!coordinates1 || !coordinates2) {
        return null;
    }

    const { lat: lat1, lng: lon1 } = coordinates1;
    const { lat: lat2, lng: lon2 } = coordinates2;

    const R = 3958.8; // Radius of the Earth in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in miles

    // Round the distance to the nearest whole value
    const roundedDistance = Math.round(distance);

    return roundedDistance;
}

// Helper function to convert degrees to radians
function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}
