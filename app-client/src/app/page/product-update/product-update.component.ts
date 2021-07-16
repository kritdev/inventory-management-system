import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/entity/category.model';
import { IProduct } from 'src/app/entity/product.model';
import { UnitOfMeasure } from 'src/app/entity/unit-of-measure.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  isSaving = false;
  product: IProduct;
  categories: ICategory[];
  unitOfMeasures: UnitOfMeasure[];  
  
  editForm = this.fb.group({
    // id: [],
    name: [null, [Validators.required]],
    productCode: [],
    brand: [],
    description: [],
    category: [],
    unitOfMeasure: [],
  });

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.updateForm(this.product);
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

    this.categories = this.dataService.retrieveCategorieList();
    this.unitOfMeasures = this.dataService.retrieveUnitOfMeasureList();
  }

  trackById(index: number, item: any): number {
    return item.id!;
  }

  save() {}

  previousState(): void {
    window.history.back();
  }
}
