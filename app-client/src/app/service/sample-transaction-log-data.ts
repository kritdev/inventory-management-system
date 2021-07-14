import { InventoryTransactionItem } from "../entity/inventory-transaction-item.model";

export const sampleTransactionByProductDataList:InventoryTransactionItem[] = [
  {
    id:701,
    transactionDate:"2021-01-20 13:30:01",
    itemCount: 5,
    description:"Buy 5 items",
    product:{id:101}
  },
  {
    id:701,
    transactionDate:"2021-01-21 09:10:41",
    itemCount: -3,
    description:"Sell 3 items",
    product:{id:101}
  },
  {
    id:701,
    transactionDate:"2021-01-22 17:40:21",
    itemCount: 10,
    description:"Buy 10 items",
    product:{id:101}
  },
];