import * as dayjs from 'dayjs';
import { IProduct } from './product.model';


export interface IInventoryTransactionItem {
  id?: number;
  transactionDate?: dayjs.Dayjs;
  itemCount?: number;
  description?: string | null;
  product?: IProduct | null;
}

export class InventoryTransactionItem implements IInventoryTransactionItem {
  constructor(
    public id?: number,
    public transactionDate?: dayjs.Dayjs,
    public itemCount?: number,
    public description?: string | null,
    public product?: IProduct | null
  ) {}
}

export function getInventoryTransactionItemIdentifier(inventoryTransactionItem: IInventoryTransactionItem): number | undefined {
  return inventoryTransactionItem.id;
}
