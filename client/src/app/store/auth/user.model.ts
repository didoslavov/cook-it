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
  error: string | null;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserData {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email: string;
  avatar?: string;
  password: string;
  rePassword?: string | undefined;
}
