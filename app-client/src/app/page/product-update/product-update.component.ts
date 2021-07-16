import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ICategory } from 'src/app/entity/category.model';
import { IImage } from 'src/app/entity/image.model';
import { IProduct, Product } from 'src/app/entity/product.model';
import { UnitOfMeasure } from 'src/app/entity/unit-of-measure.model';
import { DataUtils, FileLoadError } from 'src/app/service/data-util.service';
import { DataService } from 'src/app/service/data.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  isSaving = false;
  product: IProduct;
  productImage: IImage;
  categories: ICategory[];
  unitOfMeasures: UnitOfMeasure[];  

  isLoadingCategories = false;
  isLoadingUnitOfMeasures = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    productCode: [],
    brand: [],
    description: [],
    category: [],
    unitOfMeasure: [],

    imageId: [],
    imageData: [],
    imageDataContentType: [],
  });

  constructor(
    private fb: FormBuilder, 
    private dataService: DataService,
    private productService: ProductService,
    private dataUtils: DataUtils,
    protected elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.updateForm(this.product);
    this.retrieveData();
  }

  protected retrieveData() {
    this.retrieveCategories();
    this.retrieveUnitOfMeasures();
  }

  protected retrieveCategories() {
    this.isLoadingCategories = true;
    this.dataService.retrieveCategorieList()
      .pipe(
        finalize(() => this.isLoadingCategories = false)
      )
      .subscribe(
        result => { this.categories = result as any; },
        err => { alert(err); }
      );
  }

  protected retrieveUnitOfMeasures() {
    this.isLoadingUnitOfMeasures = true;
    this.dataService.retrieveUnitOfMeasureList()
      .pipe(
        finalize(() => this.isLoadingUnitOfMeasures = false)
      )
      .subscribe(
        result => { this.unitOfMeasures = result as any; },
        err => { alert(err); }
      );
  }

  protected updateForm(product: IProduct): void {
    if(product) {
      this.editForm.patchValue({
        id: product.id,
        name: product.name,
        productCode: product.productCode,
        brand: product.brand,
        description: product.description,
        category: product.category,
        unitOfMeasure: product.unitOfMeasure,
      });
    }
  }

  trackById(index: number, item: any): number {
    return item.id!;
  }

  protected getFormProduct(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      productCode: this.editForm.get(['productCode'])!.value,
      brand: this.editForm.get(['brand'])!.value,
      description: this.editForm.get(['description'])!.value,
      category: this.editForm.get(['category'])!.value,
      unitOfMeasure: this.editForm.get(['unitOfMeasure'])!.value,
    };
  }

  /******************************************************************
   * Image
   */

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        alert(err.message),
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  /* **************************************************************** */
  save(): void {
    this.isSaving = true;
    const product = this.getFormProduct();
    if (product.id) {
      console.log('update(product)');
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      console.log('create(product)');
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result
      .pipe(finalize(() => this.isSaving = false))
      .subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    alert('Error');
  }
}
