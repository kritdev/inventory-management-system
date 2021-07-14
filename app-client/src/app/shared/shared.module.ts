import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
