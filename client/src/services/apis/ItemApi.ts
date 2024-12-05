import { Item } from '@/types/models.types';
import { ErrorResponse } from '@/types/responses.types';
export const addItemApi = async (newItemData: FormData): Promise<Item> => {
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      body: newItemData,
    });
    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      throw new Error(`${errorData.errors.join(', ')}`);
    } else {
      const addedItem: Item = (await response.json()) as Item;
      return addedItem;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editItemApi = async (itemData: Partial<Item>): Promise<Item> => {
  try {
    const response = await fetch(`/api/items/${itemData.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      console.log('error data here', errorData);
      throw new Error(`${errorData.errors.join(', ')}`);
    } else {
      const editedItem: Item = (await response.json()) as Item;
      return editedItem;
    }
  } catch (error) {
    console.error('Error editing item:', error);
    throw error;
  }
};

export const deleteItemApi = async (id: string | number): Promise<void> => {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      throw new Error(`${errorData.errors.join(', ')}`);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const getAllItemsApi = async (): Promise<Item[]> => {
  try {
    const response = await fetch('/api/items?all_items=true');
    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      throw new Error(`${errorData.errors.join(', ')}`);
    } else {
      const items: Item[] = (await response.json()) as Item[];
      return items;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getItemApi = async (id: number | string): Promise<Item | null> => {
  try {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const item: Item = (await response.json()) as Item;
      return item;
    }
  } catch (error) {
    console.error(error);
    return null; // Return null instead of throwing
  }
};
