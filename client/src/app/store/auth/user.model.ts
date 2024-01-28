export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  password: string;
  rePass: string;
}
