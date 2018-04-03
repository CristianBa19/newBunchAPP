import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetMarcasPage } from './get-marcas';

@NgModule({
  declarations: [
    GetMarcasPage,
  ],
  imports: [
    IonicPageModule.forChild(GetMarcasPage),
  ],
  exports: [
    GetMarcasPage
  ]
})
export class GetMarcasPageModule {}
