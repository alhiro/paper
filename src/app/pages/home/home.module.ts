import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MultiFilterPipe } from '../../pipe/multiFilter.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, NgbModule, SharedModule, HomeRoutingModule, SlickCarouselModule],
  declarations: [HomeComponent, MultiFilterPipe],
})
export class HomeModule {}
