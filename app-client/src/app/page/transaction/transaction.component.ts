import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IInventoryTransactionItem, InventoryTransactionItem } from 'src/app/entity/inventory-transaction-item.model';
import { IProduct } from 'src/app/entity/product.model';
import { ProductService } from 'src/app/service/product.service';
import { TransactionItemService } from 'src/app/service/transaction-item.service';

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
    id: [],
    transactionDate: [null, [Validators.required]],
    itemCount: [null, [Validators.required]],
    description: [],
    product: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private transactionItemService: TransactionItemService,
  ) { }

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

  protected getFormItem(): IInventoryTransactionItem {
    return {
      ...new InventoryTransactionItem(),
      id: this.editForm.get(['id'])!.value,
      transactionDate: this.editForm.get(['transactionDate'])!.value,
      itemCount: this.editForm.get(['itemCount'])!.value,
      description: this.editForm.get(['description'])!.value,
      product: { id: this.editForm.get(['product'])!.value.id},
    };
  }

  save(): void {
    this.isSaving = true;
    const item = this.getFormItem();
    if (item.id) {
      this.subscribeToSaveResponse(this.transactionItemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.transactionItemService.create(item));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInventoryTransactionItem>>): void {
    result
      .pipe(finalize(() => this.isSaving = false))
      .subscribe(
        result => this.onSaveSuccess(result),
        err => this.onSaveError(err)
      );
  }

  protected onSaveSuccess(result): void {
    this.inventoryTransactionItem = {
      ...result.body,
      product: {id: result.body.product.id}         // link only to product id
    };
    this.updateForm(this.inventoryTransactionItem);

    this.previousState();
  }

  protected onSaveError(err): void {
    alert('Error');
  }

  previousState(): void {
    window.history.back();
  }
}
