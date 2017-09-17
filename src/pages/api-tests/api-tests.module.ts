import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApiTestsPage } from './api-tests';

@NgModule({
  declarations: [
    ApiTestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApiTestsPage)
  ],
  exports: [
    ApiTestsPage
  ]
})
export class ApiTestsPageModule { }
