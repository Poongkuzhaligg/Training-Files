import { User } from './user';

export interface AuthResponse {
  status: string;
  message: string;
  data?: User;
  hint?: string;
};
