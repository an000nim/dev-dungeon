export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}
