export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
}

export interface UserData {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  img?: string | undefined;
  password?: string | undefined;
  rePassword?: string | undefined;
}
