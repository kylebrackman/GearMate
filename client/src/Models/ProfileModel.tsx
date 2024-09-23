export interface Profile {
  id: number;
  user_id: number;
  // Add back in when active_storage is implemented
  // profile_picture: string;
  bio: string;
  location: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
}
