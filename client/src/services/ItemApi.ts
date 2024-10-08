import { Item } from '@/types/models.types';

export const addItemApi = async (newItemData: FormData): Promise<Item> => {
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      body: newItemData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors);
    } else {
      const addedItem = await response.json();
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
      const errorData = await response.json();
      throw new Error(errorData);
    } else {
      const editedItem = await response.json();
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
      const errorData = await response.json();
      throw new Error(errorData.errors);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const getAllItemsApi = async (): Promise<Item[]> => {
  try {
    const response = await fetch('/api/items?all_items=true');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting all items:', error);
    throw error;
  }
};

export const getItemApi = async (id: number | string): Promise<Item | null> => {
  try {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null instead of throwing
  }
};
