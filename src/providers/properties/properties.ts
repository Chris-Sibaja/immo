import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Events } from 'ionic-angular';
import { User} from '../../providers';
import { PopoverController } from 'ionic-angular';
declare var google: any;
declare var H: any;

@Injectable()
export class Properties { 




    properties          : any = []; 
    userProperties      : any = []; 
    markers             : any = [];     
    userMarkCors : any ;
    property : any ;
    seccion_1: any = [];   
    seccion_2: any = [];   
    seccion_3: any = [];   
    seccion_4: any = [];   
    seccion_5: any = [];   


    constructor(public popoverController: PopoverController,  private user: User, public api: Api, public events: Events) { 

    }

    /**Solicitar una propiedad en especifico */
    query(params?: any, edit : boolean = false) {     
        return this.api.post('m=property&folio=' + params);
    }


    /**Vista previa de una propiedad */
    getPreview(params?: any) { 
        return this.api.post('m=property&folio=' + params + '&preview=true' + '&token=' + this.user.userToken + '&user=' + this.user.userInfo.userid);
    }

    /**Solicitar Listado de propiedades de la comunidad IMMO */
    init( user){  

        console.log('Inicialisando los reportes');

            return new Promise<any>(resolve => {

                this.properties = {
                    "seccion_1": [
                        {
                            "name": "name",
                            "lat": 18.653699,
                            "lng": -91.822069,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.645877,
                            "lng": -91.829351,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.658575, 
                            "lng":- 91.817512,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.644448, 
                            "lng":- 91.819750,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.6363599, 
                            "lng":-91.8262028,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.6373359, 
                            "lng":-91.778953,
                            "description" : "descripcion",
                            "image": ""
                        }
                 



                    ],
                    "seccion_2": [
                        {
                            "name": "name",
                            "lat": 18.653584,
                            "lng": -91.820976,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.6517307,
                            "lng": -91.7816137,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.6481118,
                            "lng": -91.8100666,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.652981,
                            "lng": -91.826235,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.660944,
                            "lng": -91.820491,
                            "description" : "descripcion",
                            "image": ""
                        }],
                    "seccion_3": [
                        {
                            "name": "name",
                            "lat": 18.653123,
                            "lng": -91.827410,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.6585413,
                            "lng": -91.8301081,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.655502,
                            "lng": -91.8455683,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.6319752,
                            "lng": -91.8287957,
                            "description" : "descripcion",
                            "image": ""
                        },
                        {
                            "name": "name",
                            "lat": 18.647143,
                            "lng": -91.817213,
                            "description" : "descripcion",
                            "image": ""
                        }]
                
                    };


                resolve(true);
                this.generateMarks();





            }); 
        
       
    }

    /**Genera los marcadores para las propiedades */
    generateMarks(){
        console.log('Generando los marcadores');
        //Recorre todas las propiedades, las que tienen ubicación las guarda en markers para colocar en el mapa



        for (let i = 0; i < this.properties.seccion_1.length; i++) {


            let location = this.properties.seccion_1[i];

            if (location['lat'] == 0 || location['lng'] == 0 ){
            }else{

                let icon = new H.map.Icon('assets/icon/s3.png'),
                    coords = { lat: location['lat'], lng: location['lng'] };
                    location['mark'] = new H.map.Marker(coords, { icon: icon });


                location['mark'].addEventListener('click', function (evt) {
                    console.log('click');
                });

                this.seccion_1.push(location);

            }           
        }



        for (let i = 0; i < this.properties.seccion_2.length; i++) {


            let location = this.properties.seccion_2[i];

            if (location['lat'] == 0 || location['lng'] == 0) {
            } else {

                let icon = new H.map.Icon('assets/icon/s1.png'),
                    coords = { lat: location['lat'], lng: location['lng'] };
                location['mark'] = new H.map.Marker(coords, { icon: icon });

                this.seccion_2.push(location);

            }
        }


        for (let i = 0; i < this.properties.seccion_3.length; i++) {


            let location = this.properties.seccion_3[i];

            if (location['lat'] == 0 || location['lng'] == 0) {
            } else {

                let icon = new H.map.Icon('assets/icon/s2.png'),
                    coords = { lat: location['lat'], lng: location['lng'] };
                location['mark'] = new H.map.Marker(coords, { icon: icon });

                this.seccion_3.push(location);

            }
        }


        console.log(this.properties.seccion_1);
        console.log(this.properties.seccion_2);
        console.log(this.properties.seccion_3);

    }

    /**Genera un card en el mapa */
    generateFlayer(info, $this) {

        var flayer = $this.popoverController.create('CardMapPage', { info: info }, { cssClass: 'popover-map' });
        flayer.present();

    }
 
    /**Crea una nueva propiedad */
    add(item: any) {
        return new Promise((resolve) => {

            this.api.post('m=addProperty&user=' + this.user.userInfo.userid + '&token=' + this.user.userToken + item).subscribe(data => {

                if(data.status == 200){

                    if(data.json().status == 200){

                        var datos: any = data.json().property;
                        var dummy: any = {};

                        dummy.folio         = datos.folio;
                        dummy.largephoto    = datos.largephoto;
                        dummy.smallphoto    = datos.smallphoto;
                        dummy.namePropertyEs= datos.namePropertyEs;
                        dummy.descriptionEs = datos.descriptionEs;
                        dummy.city          = datos.city;
                        dummy.state         = datos.state;
                        dummy.toperation    = datos.toperation;
                        dummy.prices        = datos.prices;
                        dummy.stateid       = datos.stateid;

                        resolve([true, data.json().folio]);

                    }else{
                        resolve(false);
                        this.api.alert(501);
                    }
                }else{
                    resolve(false);
                    this.api.alert(500);
                }
           

            });

        });

    } 

    /**Solicita la lista de propiedades de un usuario */
    getUserProperties(params?: any){

        return new Promise<any>(resolve => {
            this.api.post('m=userProperties&folios=' + this.user.userProperties + '&user=' + this.user.userInfo.userid + '&token=' + this.user.userToken ).subscribe(data => {
                if(data.status == 200){
                    if(data.json().status == 200){
                        this.userProperties = data.json().data;
                        resolve(true);
                    }else{
                        this.api.alert(401);
                        resolve(false);
                    }
                }else{
                    this.api.alert(400);
                    resolve(false);
                }        
            });
        });
        
    }

  


    /**Regresa marcadores que cumplen con "api.filtreMap" */
    get propertiesMap(){

        var properties : any = [];

        this.markers.forEach((value) => {

            //return; -> Significa que la propiedad / desarrollo no cumple con el filtro y se omite de añadir a la lista final.

            var integer     = 0;
            var integer2    = 0;
            var integer3    = 0;
            var integer4    = 0;

            //Si la descripcion tiene mas de 130 caracteres, se recorta.
            if (value.descriptionEs.length > 130) {
                value.descriptionEs = value.descriptionEs.substring(0, 145);
                value.descriptionEs = value.descriptionEs + '...';
            }

            //Tipo de propiedad 
            if (this.api.filtreMap.type) {
                if (this.api.filtreMap.type != value.typepropertyid) {
                    return;
                }
            }

            integer     = parseInt(this.api.filtreMap.operation, 10);
            integer2    = parseInt(value.sold, 10);
            integer3    = parseInt(value.longtermrental, 10);
            integer4    = parseInt(value.vacation_rental, 10);

            if (this.api.filtreMap.operation) {
                //Tipo de operación en filtro
                switch (integer){

                    case 1:
                        if (integer2 == 1) // venta
                            break;
                        return;

                    case 2:
                        if (integer3 == 1) //renta
                            break;
                        return;
                        
                    case 3:
                        if (integer4 == 1) //renta vacacional
                            break;
                        return;                                       
                    
                }
            }

            integer     = parseInt(this.api.filtreMap.moneda, 10);
            integer2    = parseInt(value.currencyid, 10);

            if (this.api.filtreMap.moneda) {
                if (!(integer2 == integer)) {
                    return;
                }
            }
            //-

            //Precio minimo
            integer = parseInt(this.api.filtreMap.priceMin, 10);
            integer2 = parseInt(value.price, 10);

            if (this.api.filtreMap.priceMin && value.price) {
                if (!(integer <= integer2)) {
                    return;
                }
            }
            //-

            //Precio maximo
            integer = parseInt(this.api.filtreMap.priceMax, 10);
            integer2 = parseInt(value.price, 10);

            if (this.api.filtreMap.priceMax && value.price) {
                if (!(integer >= integer2)) {
                    return;
                }
            }
            //-

            //Recamaras minimas
            integer = parseInt(this.api.filtreMap.bedMin, 10);
            integer2 = parseInt(value.bedrooms, 10);
            if (this.api.filtreMap.bedMin && value.bedrooms) {
                if (!(integer <= integer2)) {
                    return;
                }
            }
            //-

            //Recamaras maximas
            integer = parseInt(this.api.filtreMap.bedMax, 10);
            integer2 = parseInt(value.bedrooms, 10);

            if (this.api.filtreMap.bedMax && value.bedrooms) {
                if (!(integer >= integer2)) {
                    return;
                }
            }
            //-

            //Metros 2 minimos
            integer = parseInt(this.api.filtreMap.m2Min, 10);
            integer2 = parseInt(value.m2c, 10);

            if (this.api.filtreMap.m2Min && value.m2c) {

                if (!(integer <= integer2)) {
                    return;
                }
            }
            //-

            //Metros 2 Maximos
            integer = parseInt(this.api.filtreMap.m2Max, 10);
            integer2 = parseInt(value.m2c, 10);

            if (this.api.filtreMap.m2Max && value.m2c) {

                if (!(integer >= integer2)) {
                    return;
                }
            }



            //Cajones de estacionamientos minimo
            integer = parseInt(this.api.filtreMap.parkMin, 10);
            integer2 = parseInt(value.parking, 10);

            if (this.api.filtreMap.parkMin && value.parking) {

                if (!(integer <= integer2)) {
                    return;
                }
            }

            //Cajones de estacionamientos parkMax
            integer = parseInt(this.api.filtreMap.parkMax, 10);
            integer2 = parseInt(value.parking, 10);

            if (this.api.filtreMap.parkMax && value.parking) {

                if (!(integer >= integer2)) {
                    return;
                }
            }


            properties.push(value);

        });

        return properties;
    }


}
