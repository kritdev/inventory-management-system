import { ICategory } from "./category.model";
import { IUnitOfMeasure } from "./unit-of-measure.model";

export interface IProduct {
  id?: number;
  name?: string;
  productCode?: string | null;
  brand?: string | null;
  description?: string | null;
  category?: ICategory | null;
  unitOfMeasure?: IUnitOfMeasure | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public productCode?: string | null,
    public brand?: string | null,
    public description?: string | null,
    public category?: ICategory | null,
    public unitOfMeasure?: IUnitOfMeasure | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
