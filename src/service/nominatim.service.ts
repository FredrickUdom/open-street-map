import axios from 'axios';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/reverse';

// Function to fetch nearby places using Nominatim's reverse geocoding
export const fetchNearbyPlaces = async (
  lat: number,
  lon: number,
  placeType: string
): Promise<any> => {
  try {
    // Use reverse geocoding to get data near lat/lon coordinates
    const response = await axios.get(NOMINATIM_BASE_URL, {
      params: {
        format: 'json',
        lat: lat,
        lon: lon,
        zoom: 18, // High zoom level to get detailed results
        addressdetails: 1,
        extratags: 1,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch places. Status code: ${response.status}`);
    }

    const { data } = response;

    // Filter the response to return only petrol stations (fuel type)
    if (data && data.extratags) {
      return {
        name: data.display_name,
        lat: data.lat,
        lon: data.lon,
        type: data.extratags.amenity === placeType ? placeType : 'fuel station',
      };
    } else {
      return { error: 'No petrol station found near the specified location' };
    }
  } catch (error) {
    console.error('Error fetching data from Nominatim:', error);
    throw error;
  }
};
