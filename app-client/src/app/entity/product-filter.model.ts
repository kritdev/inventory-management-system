export interface IProductFilter {
  productName?: string;
  category?: string;
}

export class ProductFilter implements IProductFilter {
  constructor(public productName?: string | null, public category?: string | null) {}
}