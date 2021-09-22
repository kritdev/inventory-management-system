import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ICategory } from 'src/app/entity/category.model';
import { IImage } from 'src/app/entity/image.model';
import { IProduct, Product } from 'src/app/entity/product.model';
import { UnitOfMeasure } from 'src/app/entity/unit-of-measure.model';
import { DataUtils, FileLoadError } from 'src/app/service/data-util.service';
import { DataService } from 'src/app/service/data.service';
import { ImageService } from 'src/app/service/image.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  isSaving = false;
  isImageSaving = false;
  product: IProduct;
  productImage: IImage;
  categories: ICategory[];
  unitOfMeasures: UnitOfMeasure[];  

  isLoadingProduct = false;
  isLoadingCategories = false;
  isLoadingUnitOfMeasures = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    productCode: [],
    brand: [],
    description: [],
    category: [null, [Validators.required]],
    unitOfMeasure: [null, [Validators.required]],
  });

  imageForm = this.fb.group({
    imageId: [],
    imageData: [null, [Validators.required]],
    imageDataContentType: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private dataService: DataService,
    private productService: ProductService,
    private imageService: ImageService,
    private dataUtils: DataUtils,
    protected elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.retrieveData();
    this.updateForm(this.product);

    // if provide product id, retrieve product
    this.route.params.subscribe(p => {
      if(p.id) {
        this.retrieveProduct(p.id);
      }
    });

  }

  protected retrieveProduct(productId: number) {
    this.isLoadingProduct = true;
    this.productService.find(productId)
      .pipe(
        finalize(() => this.isLoadingProduct = false)
      )
      .subscribe(
        result => { 
          this.product = result.body; 
          this.updateForm(this.product);
        },
        err => { alert(err); }
      );
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

    this.displayProductImage(product);
    }
  }

  protected updateImageForm(image: IImage): void {
    if(image) {
      this.imageForm.patchValue({
        imageId: image.id,
        imageData: image.imageData,
        imageDataContentType: image.imageDataContentType,
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

  protected getFormImage(): IImage {
    return {
      ...new Image(),
      id: this.imageForm.get(['imageId'])!.value,
      imageData: this.imageForm.get(['imageData'])!.value,
      imageDataContentType: this.imageForm.get(['imageDataContentType'])!.value,
    };
  }

  getCountInStock():number {
    return this.product && this.product.stockItems && this.product.stockItems[0] ? this.product.stockItems[0].countInStock : 0;
  }

  previousState(): void {
    window.history.back();
  }

  /******************************************************************
   * Image
   */
   displayProductImage(product: IProduct) {
    if(product && product.images && product.images[0]) {
      this.updateImageForm(product.images[0]);
    }
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.imageForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        alert(err.message),
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.imageForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  saveImage(): void {
    if(!(this.product && this.product.id)){
      alert("Product is invalid");
    }

    this.isImageSaving = true;
    const image = this.getFormImage();
    image.product = {id: this.product.id};

    if (image.id) {
      this.subscribeToSaveImageResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveImageResponse(this.imageService.create(image));
    }
  }

  protected subscribeToSaveImageResponse(result: Observable<HttpResponse<IProduct>>): void {
    result
      .pipe(finalize(() => this.isImageSaving = false))
      .subscribe(
        result => this.onSaveImageSuccess(result),
        err => this.onSaveError(err)
      );
  }

  protected onSaveImageSuccess(result): void {
    const image = result.body;
    if(!this.product.images){
      this.product.images = [image];
    } else {
      this.product.images[0] = image;
    }

    this.updateImageForm(image);
  }

  /* **************************************************************** */

  save(): void {
    this.isSaving = true;
    const product = this.getFormProduct();
    if (product.id) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result
      .pipe(finalize(() => this.isSaving = false))
      .subscribe(
        result => this.onSaveSuccess(result),
        err => this.onSaveError(err)
      );
  }

  protected onSaveSuccess(result): void {
    this.product = result.body;
    this.updateForm(this.product);
  }

  protected onSaveError(err): void {
    alert('Error');
  }

}
