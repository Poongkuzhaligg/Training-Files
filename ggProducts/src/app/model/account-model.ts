import { User } from './user';

export interface AuthResponse {
  status: ApiStatus;
  message: string;
  data?: User;
  hint?: string;
};

export enum ApiStatus {
  success = 'Success',
  failed = 'Failure'
}

