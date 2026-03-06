export interface User {
  name: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}
