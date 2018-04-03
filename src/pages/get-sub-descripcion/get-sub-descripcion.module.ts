import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetSubDescripcionPage } from './get-sub-descripcion';

@NgModule({
  declarations: [
    GetSubDescripcionPage,
  ],
  imports: [
    IonicPageModule.forChild(GetSubDescripcionPage),
  ],
  exports: [
    GetSubDescripcionPage
  ]
})
export class GetSubDescripcionPageModule {}
