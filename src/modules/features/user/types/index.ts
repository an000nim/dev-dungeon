export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
};

export type UserState = {
  profile: User | null;
  loading: boolean;
  error: string | null;
};
