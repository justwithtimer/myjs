import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatwithPage } from './chatwith';

@NgModule({
  declarations: [
    ChatwithPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatwithPage),
  ],
})
export class ChatwithPageModule {}
