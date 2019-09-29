import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { Properties } from '../../providers'


@IonicPage()
@Component({
    selector: 'page-card-map',
    templateUrl: 'card-map.html',
})
export class CardMapPage {

    public data : any =[];
    
    constructor(private properties : Properties, private navCtrl: NavController, private navParams: NavParams) {
        //Recibe la informacion de la propiedad que debe mostrarse
        this.data = this.navParams.data.info;
        
    }


    goInfo(folio){

        //Hace una peticion para detalles de propiedad del folio seleccionado
        this.properties.query(folio).subscribe(data => {   
            this.properties.property = data.json().data;
            this.navCtrl.push('PropertyDetailPage', 2);
        });

    }
}