import { Item } from "../models/ItemModel";

export const addItemApi = async (newItemData: FormData): Promise<Item> => {
    try {
        const response = await fetch("/api/items", {
            method: "POST",
            body: newItemData,
        })
        const data = await response.json();
        if (!data.errors) {
            return data;
        } else {
            throw new Error(data.errors.join(', '));
        }
    } catch (error) {
        console.error('Error adding new item:', error);
        throw error;
    }
};


export const editItemApi = async (id: string | number, itemData: Partial<Item>): Promise<Item> => {
    try {
        const response = await fetch(`/api/items/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: itemData }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Validation Error: ${errorData.errors}`);
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
            method: "DELETE",
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
        const response = await fetch("/api/items?all_items=true");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting all items:', error);
        throw error;
    }
}

export const getItemApi = async (id: string | number): Promise<Item> => {
    try {
        const response = await fetch(`/api/items/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting item:', error);
        throw error;
    }
}