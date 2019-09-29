import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapInventoryPage } from './map-inventory';

@NgModule({
  declarations: [
    MapInventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MapInventoryPage),
  ],
})
export class MapInventoryPageModule {}
