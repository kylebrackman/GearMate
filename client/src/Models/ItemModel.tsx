export interface Item {
    id: number;
    name: string;
    condition: string;
    // Add back in when active_storage is implemented
    // image: string;
    description: string;
    price: number;
    owner_id?: number;
    item_type?: string;
    owner_first_name?: string;
    owner_last_name?: string;
    image?: string;
}



