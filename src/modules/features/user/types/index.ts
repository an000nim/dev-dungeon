export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  coins?: number;
};

export type UserState = {
  profile: User | null;
  loading: boolean;
  error: string | null;
};
