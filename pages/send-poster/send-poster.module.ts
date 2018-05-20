import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendPosterPage } from './send-poster';

@NgModule({
  declarations: [
    SendPosterPage,
  ],
  imports: [
    IonicPageModule.forChild(SendPosterPage),
  ],
})
export class SendPosterPageModule {}
