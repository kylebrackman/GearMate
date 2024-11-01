import { Profile } from '@/types/models.types';
export const getRenterProfileApi = async (
  renterId: number
): Promise<Profile> => {
  try {
    const response = await fetch(`/api/profiles/${renterId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const profile = (await response.json()) as Profile;
    return profile;
  } catch (error) {
    console.error('Error getting renter profile:', error);
    throw error;
  }
};
