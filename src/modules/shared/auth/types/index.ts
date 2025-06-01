import { User } from '@features/user/types';

export interface AuthState {
  user: User | null;
  token: string | null;
}
