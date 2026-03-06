export interface User {
  name: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// React Navigation param list
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
