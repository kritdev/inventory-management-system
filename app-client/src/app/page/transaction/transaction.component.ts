import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IInventoryTransactionItem } from 'src/app/entity/inventory-transaction-item.model';
import { IProduct } from 'src/app/entity/product.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {


  isSaving = false;
  inventoryTransactionItem: IInventoryTransactionItem;
  products: IProduct[] = [];

  editForm = this.fb.group({
    transactionDate: [null, [Validators.required]],
    itemCount: [null, [Validators.required]],
    description: [],
    product: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {  
    this.updateForm(this.inventoryTransactionItem);
  }

  protected updateForm(inventoryTransactionItem: IInventoryTransactionItem): void {
    if(inventoryTransactionItem){
      this.editForm.patchValue({
        id: inventoryTransactionItem.id,
        transactionDate: inventoryTransactionItem.transactionDate,
        itemCount: inventoryTransactionItem.itemCount,
        description: inventoryTransactionItem.description,
        product: inventoryTransactionItem.product,
      });
    }

    this.products = this.dataService.retrieveProductList();
  }
  
  trackProductById(index: number, item: IProduct): number {
    return item.id!;
  }

  save() {}

  previousState(): void {
    window.history.back();
  }
}
