import { User } from '@features/user/types';

export type AuthState = {
  user: User | null;
  token: string | null;
};
