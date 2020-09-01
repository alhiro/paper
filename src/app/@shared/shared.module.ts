import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent, LoadingComponent } from './loader/loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, LoadingComponent],
  exports: [LoaderComponent, LoadingComponent],
})
export class SharedModule {}
