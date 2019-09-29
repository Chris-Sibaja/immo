import                      'rxjs/add/operator/toPromise';
import { Injectable }       from '@angular/core';
import { Api }              from '../api/api';
import { Storage }          from '@ionic/storage';


/** Provider user
 * Guarda y gestioda datos de sesion, registro de usuario e inicios de sesion 
 */


@Injectable()
export class User {
  userInfo        : any = [];
  userToken       : any     ;   
  userTask        : any = [];
  userProperties  : any = [];  
  status          : boolean = false ;

  constructor(private storage: Storage, public api: Api) {

  }

  //Solicitar sesion
  login(accountInfo: any) {    
    return this.api.post('m=login'+accountInfo); 
  }

  loginPromise(accountInfo: any) {

    return new Promise<any>(resolve => {

      this.api.post('m=login'+accountInfo).subscribe((data) => {

          // status 200 -> Respondio correctamente el servidor --  Ocurrio un problema con el servidor
          if (data.status == 200) {

            var info = data.json();

            //200 -> Inicio de sesion correcta -- !=200  Los datos no son correctos o el token no es valido
            if (info.status == 200) {

              //Se almacena la informacion del usuario en provider.
              this.SetuserInfo = info.data;

              //Si el usuario esta habilitado se cargan todos los providers que usa la aplicacion -- Se carga la aplicacion con acceso unico a carga de documentos.
              if (info.data.online == "1") {

                //Espera la respuesta del servidor para los datos principales y despues oculta el splashScreen.
                resolve(true);  
              } else {
                resolve(false);
              }
            } else {
              ////console.log('Falso');
              resolve(false);
            }
          } else {
            resolve(false);
          }          
        });
    });    
  }

  //Registro de cuenta
  signup(accountInfo: any) {
    let response = this.api.post(accountInfo).share();
    return response;
  }

  //Cerrar sesion
  logout() {
    this.userInfo = null;
    this.storage.remove('user');
  }
  
  /**Obtiene las tareas del usuario */
  getTask() {

    return new Promise<any>(resolve => {

      var id = this.userInfo.userid;

      this.api.post('m=task&user=' + id + '&token=' + this.userInfo.token).subscribe(data => {

        if (data.status == 200 && data.json().status == 200) {

          this.userTask = data.json().data;
          resolve(true);

        } else {

          resolve(false);

        }

      });

    });

  }




  /**Crear nueva tarea */
  addTask(body) {
    //console.log(body);

    return new Promise<any>(resolve => {

      this.api.post(body).subscribe(data => {


        if (data.status == 200 && data.json().status == 200) {

          resolve(true);

        } else {

          resolve(false);

        }

      });

    });

  }

  //Almacena toda la informacion de la sesion, informacion del usuario, token de la sesion, propiedades del usuario.
  set SetuserInfo(val){
    this.userToken  = val.token;
    this.userInfo   = val;
    this.status     = true;
    this.userProperties = val.properties;
    this.storage.set('userToken', this.userToken);   
  }


}
