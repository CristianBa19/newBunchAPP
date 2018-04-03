import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetDetallePage } from './get-detalle';

@NgModule({
  declarations: [
    GetDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(GetDetallePage),
  ],
  exports: [
    GetDetallePage
  ]
})
export class GetDetallePageModule {}
