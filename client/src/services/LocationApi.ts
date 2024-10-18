import { ErrorResponse, CityAndState } from '@/types/responses.types';

export const getCityAndStateApi = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch('/api/city_and_state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: { latitude, longitude },
      }),
    });
    if (!response.ok) {
      console.log(response);
      const errorData = (await response.json()) as ErrorResponse;
      throw new Error(`${errorData.errors.join(', ')}`);
    } else {
      const cityAndState = (await response.json()) as CityAndState;
      // console.log(cityAndState);
      return cityAndState;
    }
  } catch (error) {
    console.error('Error fetching city and state:', error);
    throw error;
  }
};
