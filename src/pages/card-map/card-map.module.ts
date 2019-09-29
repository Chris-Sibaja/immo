import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardMapPage } from './card-map';

@NgModule({
  declarations: [
    CardMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CardMapPage),
  ],
})
export class CardMapPageModule {}
