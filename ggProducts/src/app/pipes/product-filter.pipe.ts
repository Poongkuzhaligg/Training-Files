import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';


@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
      return products;
    }
    else {
      searchTerm = searchTerm.toLowerCase();
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
        || product.code.includes(searchTerm));
    }
  }

}
