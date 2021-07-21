import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

@NgModule({
  exports: [
    FormsModule, 
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
})
export class SharedModule {}
