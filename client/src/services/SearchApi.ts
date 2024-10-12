import { Item } from '@/types/models.types';
export const searchItemsApi = async (): Promise<Item[]> => {
  const response = await fetch('/api/items?all_items=true');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = (await response.json()) as Item[];
  return data;
};
