import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IInventoryTransactionItem } from 'src/app/entity/inventory-transaction-item.model';
import { IProduct } from 'src/app/entity/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  isLoading = true;
  isSaving = false;
  inventoryTransactionItem: IInventoryTransactionItem;
  productNameList: IProduct[] = [];

  editForm = this.fb.group({
    transactionDate: [null, [Validators.required]],
    itemCount: [null, [Validators.required]],
    description: [],
    product: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {  
    this.retrieveProductNameList();
    this.updateForm(this.inventoryTransactionItem);
  }

  protected retrieveProductNameList() {
    this.isLoading = true;
    this.productService.getNameList().subscribe(
      (res: HttpResponse<IProduct[]>) => {
        this.isLoading = false;
        this.productNameList = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
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
  }
  
  trackProductById(index: number, item: IProduct): number {
    return item.id!;
  }

  save() {}

  previousState(): void {
    window.history.back();
  }
}
