import { Product } from './product';

export interface Favourites {
  userEmail: string;
  userProducts: Product[];
};
