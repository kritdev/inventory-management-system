import { ICategory } from "./category.model";
import { IImage, Image } from "./image.model";
import { IStockItem } from "./stock-item.model";
import { IUnitOfMeasure } from "./unit-of-measure.model";

export interface IProduct {
  id?: number;
  name?: string;
  productCode?: string | null;
  brand?: string | null;
  description?: string | null;
  category?: ICategory | null;
  unitOfMeasure?: IUnitOfMeasure | null;
  images?: IImage[] | null;
  stockItems?: IStockItem[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public productCode?: string | null,
    public brand?: string | null,
    public description?: string | null,
    public category?: ICategory | null,
    public unitOfMeasure?: IUnitOfMeasure | null,
    public images?: IImage[] | null,
    public stockItems?: IStockItem[] | null,
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}

export function hasImage(product: IProduct):boolean {
  return product.images && product.images.length > 0;
}

export function getProductImage(product: IProduct): IImage {
  if(hasImage(product)) {
    return product.images[0];
  } else {
    return null;
  }
}

export function getCountInStock(product: IProduct): number {
  if(product.stockItems && product.stockItems.length ) {
    return product.stockItems[0].countInStock;
  } else {
    return 0;
  }
}