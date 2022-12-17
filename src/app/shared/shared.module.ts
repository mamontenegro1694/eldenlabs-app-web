import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FlexLayoutModule,
    LayoutComponent
  ]
})
export class SharedModule { }
