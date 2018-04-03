import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatNvoPage } from './chat-nvo';

@NgModule({
  declarations: [
    ChatNvoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatNvoPage),
  ],
  exports: [
    ChatNvoPage
  ]
})
export class ChatNvoPageModule {}
