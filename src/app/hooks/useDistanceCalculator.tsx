import { useEffect, useState } from 'react';

export interface Coordinates {
    lat: number;
    lng: number;
}

// Function to calculate distance using Haversine formula
function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
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

    return distance;
}

// Helper function to convert degrees to radians
function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

// Custom hook for calculating distance
export const useDistanceCalculator = (
    coordinates1: Coordinates,
    coordinates2: Coordinates
): number | null => {
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        if (coordinates1 && coordinates2) {
            const { lat: lat1, lng: lon1 } = coordinates1;
            const { lat: lat2, lng: lon2 } = coordinates2;

            const calculatedDistance = calculateDistance(lat1, lon1, lat2, lon2);
            setDistance(calculatedDistance);
        }
    }, [coordinates1, coordinates2]);

    return distance;
};
