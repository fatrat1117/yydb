import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableViewPage } from './table-view';

@NgModule({
  declarations: [
    TableViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TableViewPage),
  ],
})
export class TableViewPageModule {}
