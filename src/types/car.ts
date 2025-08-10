export interface Car {
  is_hot_sale: boolean;
  id: number;
  title: string;
  slug: string;
  description?: string;
  price: string;
  main_image: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: string;
  color?: string;
  engine_size?: string;
  doors?: number;
  seats?: number;
  features?: string;
  features_list?: string[];
  additional_images?: CarImage[];
  is_featured: boolean;
  created_at?: string;
  primary_damage?: string; // New field for primary damage
  keys?: boolean; // New field for keys availability
  // cylinders?: number; // New field for number of cylinders
  drive?: string; // New field for drive type (e.g., FWD, AWD, RWD)
  body_style?: string; // New field for body style (e.g.,

}



export interface CarImage {
  id: number;
  image: string;
  caption: string;
}

export interface User {
  is_superuser: boolean;
  is_staff: boolean;
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AdminStats {
  car_stats: { make: string; count: number }[];
  user_stats: {
    total: number;
    active: number;
    admins: number;
  };
  car_overview: {
    total: number;
    available: number;
    featured: number;
  };
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  last_login: string | null;
}