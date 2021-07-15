import { Component, Input, OnInit } from '@angular/core';
import { IInventoryTransactionItem } from 'src/app/entity/inventory-transaction-item.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-inventory-log',
  templateUrl: './inventory-log.component.html',
  styleUrls: ['./inventory-log.component.css']
})
export class InventoryLogComponent implements OnInit {

  @Input() productId: number;
  transactionItems: IInventoryTransactionItem[];
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.transactionItems = this.dataService.retrieveTransactionLogByProductId(this.productId);
  }

  getAbsNumber(number) {
    return Math.abs(number);
  }
}
