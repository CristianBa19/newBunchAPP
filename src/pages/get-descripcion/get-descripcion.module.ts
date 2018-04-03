import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetDescripcionPage } from './get-descripcion';

@NgModule({
  declarations: [
    GetDescripcionPage,
  ],
  imports: [
    IonicPageModule.forChild(GetDescripcionPage),
  ],
  exports: [
    GetDescripcionPage
  ]
})
export class GetDescripcionPageModule {}
