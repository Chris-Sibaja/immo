import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class Api {

  //public url              : string = 'http://api.immosystem.com.mx' ;
  public url: string = 'https://cortana.immosystem.com.mx/api/index.php';

  public urlRoot: string = 'http://agent.immosystem.com.mx/api/index.php';
  public options          : any ;
  public filtre           : any =[]; 
  
  public filtreDevelopments   : any =[];
  public filtreUserProperties : any =[];
  public filtreProperties     : any =[];
  public filtreMap            : any =[];

  public filtreBuyer: any = [];

  public totalProperties    = 0;
  public totalDevelopments  = 0; 
  public totalUnits         = 0;

  public propertyid = 0;  


  constructor(public alertCtrl: AlertController, public http: Http) {
    var headers   = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8", 
                                  'Accept': 'application/json'
                                
                                });
    this.options  = new RequestOptions({ headers: headers });
  
  }

  get(body: any, url?: any){

    if (url) {
      return this.http.get(url+ body, this.options);

    } else {
      return this.http.get(this.url+ body, this.options);
    }
  } 

  post(body: any, url ?: any) {
    if(url){
      return this.http.post(url, body, this.options);
    }else{
      return this.http.post(this.url, body, this.options);
    }
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, this.options);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, this.options);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, this.options);
  }

  alert(code){  
    ////console.log('Creando alerta');
    const alert = this.alertCtrl.create({
      title: 'UPS!',
      subTitle: 'Algo salió mal. Inténtalo de nuevo más tarde. \n Si el problema continua póngase en contacto con el soporte técnico ('+ code +')',
      buttons: ['Aceptar']
    });

    alert.present();
  }

}
