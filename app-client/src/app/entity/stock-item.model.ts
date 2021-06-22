import { IProduct } from 'app/entities/product/product.model';

export interface IStockItem {
  id?: number;
  countInStock?: number | null;
  product?: IProduct | null;
}

export class StockItem implements IStockItem {
  constructor(public id?: number, public countInStock?: number | null, public product?: IProduct | null) {}
}

export function getStockItemIdentifier(stockItem: IStockItem): number | undefined {
  return stockItem.id;
}
