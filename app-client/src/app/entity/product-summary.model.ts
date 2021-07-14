import { ICategory } from "./category.model";
import { IImage } from "./image.model";
import { IStockItem } from "./stock-item.model";
import { IUnitOfMeasure } from "./unit-of-measure.model";

export interface IProductSummary {
  id?: number;
  name?: string;
  productCode?: string | null;
  brand?: string | null;
  description?: string | null;
  category?: ICategory | null;
  unitOfMeasure?: IUnitOfMeasure | null;
  stockItems?: IStockItem[] | null;
  images?: IImage[] | null;
}

export class ProductSummary implements IProductSummary {
  constructor(
    public id?: number,
    public name?: string,
    public productCode?: string | null,
    public brand?: string | null,
    public description?: string | null,
    public category?: ICategory | null,
    public unitOfMeasure?: IUnitOfMeasure | null,
    public stockItems?: IStockItem[] | null,
    public images?: IImage[] | null
  ) {}
}

export function getProductSummaryIdentifier(productSummary: IProductSummary): number | undefined {
  return productSummary.id;
}
