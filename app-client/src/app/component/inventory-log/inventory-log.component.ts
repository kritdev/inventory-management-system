import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IInventoryTransactionItem } from 'src/app/entity/inventory-transaction-item.model';
import { TransactionItemService } from 'src/app/service/transaction-item.service';

@Component({
  selector: 'app-inventory-log',
  templateUrl: './inventory-log.component.html',
  styleUrls: ['./inventory-log.component.css']
})
export class InventoryLogComponent implements OnInit {

  @Input() productId: number;
  isLoading = false;
  transactionItems: IInventoryTransactionItem[];
  
  constructor(private transactionItemService: TransactionItemService) { }

  ngOnInit(): void {
    this.retrieveInventoryTransactionItemList();
  }

  protected retrieveInventoryTransactionItemList() {
    if(!this.productId) {
      return;
    }

    this.isLoading = true;
    this.transactionItemService.queryByProductId(this.productId).subscribe(
      (res: HttpResponse<IInventoryTransactionItem[]>) => {
        this.isLoading = false;
        this.transactionItems = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getAbsNumber(number) {
    return Math.abs(number);
  }
}
