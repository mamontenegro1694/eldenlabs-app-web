import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    FlexLayoutModule,
    LayoutComponent
  ]
})
export class SharedModule { }
