import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetModelosPage } from './get-modelos';

@NgModule({
  declarations: [
    GetModelosPage,
  ],
  imports: [
    IonicPageModule.forChild(GetModelosPage),
  ],
  exports: [
    GetModelosPage
  ]
})
export class GetModelosPageModule {}
