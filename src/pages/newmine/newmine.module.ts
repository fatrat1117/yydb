import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewminePage } from './newmine';

@NgModule({
  declarations: [
    NewminePage,
  ],
  imports: [
    IonicPageModule.forChild(NewminePage),
  ],
})
export class NewminePageModule {}
