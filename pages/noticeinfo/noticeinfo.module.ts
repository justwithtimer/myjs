import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeinfoPage } from './noticeinfo';

@NgModule({
  declarations: [
    NoticeinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeinfoPage),
  ],
})
export class NoticeinfoPageModule {}
