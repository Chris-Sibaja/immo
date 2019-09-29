import { enableProdMode, Component, ViewChild }                 from '@angular/core';
import { SplashScreen }                                         from '@ionic-native/splash-screen';
import { Nav, App, Platform, MenuController, AlertController}from 'ionic-angular';
import { Storage }                                              from '@ionic/storage';
import { User, Properties,  Api }     from '../providers/';
import { FirstRunPage, MainPage }                  from '../pages';
 

enableProdMode();     

@Component({ templateUrl: 'app.html' })



export class MyApp {

  public rootPage     : any ;
  public sesion       : boolean = false;
  @ViewChild(Nav) nav : Nav;

  constructor( public api: Api, public App: App,  private alertCtrl: AlertController,  private properties: Properties,  private storage : Storage, public user : User, private menu : MenuController, platform: Platform,  private splashScreen: SplashScreen) {
    

    platform.ready().then(() => {
        platform.registerBackButtonAction(() => {


          switch (this.nav.getActive().id){

            case 'ProfilePage':
              let alert = this.alertCtrl.create({
                title: 'Salir',
                message: '¿Salir de la aplicacion?',
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => { }
                  },
                  {
                    text: 'Aceptar',
                    handler: () => {
                      platform.exitApp();

                    }
                  }
                ]
              });
              alert.present();
        }
        
        });




      let user = this.storage.get('userToken');



      //Espera la respuesta del storage.
      Promise.all([user]).then(data => {

        //true -> El token existe  --  El token no existe, se envia al formulario de iniciar sesion
        if (data[0]) {
          let body = '&token=' + data[0];

          //Se hace la peticion y se espera respuesta del servidor.
          var promise = this.user.loginPromise(body);          
 
          Promise.all([promise]).then(data => {

            //Si la sesion es correcta, carga los provides necesarios para iniciar la aplicacion
            if(data[0]){


              var d = this.properties.init(this.user.userInfo);   // para propiedades luxury

              //Espera la respuesta del servidor para los datos principales y despues oculta el splashScreen.
               Promise.all([ d]).then(data => {
             
                 console.log('Iniciando espera de datos');


                this.rootPage = MainPage;             
                
               });

            }else{
              this.sesion = true;
              this.rootPage = FirstRunPage;  
              this.splashScreen.hide();  
            }

          });  
 
        }else{
          this.rootPage = FirstRunPage;  
   
          this.splashScreen.hide();       

        }

      });

    });
  }


  openPage(page) {

    
    var component = page.component;

    if (page.component == 'WelcomePage'){


      let alert = this.alertCtrl.create({
        title: 'Salir',
        message: '¿Finalizar sesión?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.storage.remove('userToken');
              this.nav.setRoot(component, {}, { animate: true, direction: 'forward' });
            }
          }
        ]
      });

      alert.present();

    }else{
     
  
      if (this.nav.getActive().id == page.component && page.component == 'MapInventoryPage') {

      } else if (page.component == 'MapInventoryPage'){
        this.nav.push('AddTaskPage');
      }else{
        this.nav.setRoot(component, {}, { animate: true, direction: 'forward' });        
      }

    }
    
  }


  ionViewDidEnter() {
    this.menu.enable(true);
  }

}