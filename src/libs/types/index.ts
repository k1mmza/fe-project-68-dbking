export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  tel: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string; // Optional if using token-only refresh logic
}

export interface RegisterData extends LoginCredentials {
  name: string;
  tel: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data: User;
}

export interface Campground {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  picture: string;
  __v?: number;
  id?: string;
}

export interface Booking {
  _id: string;
  bookingDate: string;
  user: string; // User ID
  campground: Campground; // The API usually populates this object
  createdAt: string;
}

export interface BookingInput {
  bookingDate: string;
}