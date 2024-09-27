export const getRenterProfileApi = async (renterId: number) => {
  try {
    const response = await fetch(`/api/profiles/${renterId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting renter profile:', error);
    throw error;
  }
};
