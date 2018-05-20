import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LosethingPage } from './losething';

@NgModule({
  declarations: [
    LosethingPage,
  ],
  imports: [
    IonicPageModule.forChild(LosethingPage),
  ],
})
export class LosethingPageModule {}
