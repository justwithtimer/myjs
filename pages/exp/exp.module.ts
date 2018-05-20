import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpPage } from './exp';

@NgModule({
  declarations: [
    ExpPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpPage),
  ],
})
export class ExpPageModule {}
