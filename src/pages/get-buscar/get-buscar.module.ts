import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetBuscarPage } from './get-buscar';

@NgModule({
  declarations: [
    GetBuscarPage,
  ],
  imports: [
    IonicPageModule.forChild(GetBuscarPage),
  ],
  exports: [
    GetBuscarPage
  ]
})
export class GetBuscarPageModule {}
