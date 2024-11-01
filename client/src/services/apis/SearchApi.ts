import { Item } from '@/types/models.types';
import { SearchFields } from '@/types/search.types';
export const searchItemsApi = async (
  searchParams: SearchFields
): Promise<Item[]> => {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>
  ).toString();

  const response = await fetch(`/api/item_search?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as Item[];
  return data;
};
