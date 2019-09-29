import { Component, ViewChild               } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { User, Properties, Api              } from '../../providers/';
import { Camera                             } from '../../../node_modules/@ionic-native/camera';
import { FormBuilder, FormGroup             } from '../../../node_modules/@angular/forms';
import { FileTransfer, FileTransferObject   } from '@ionic-native/file-transfer';
import { MyApp  }   from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  public doc     : any ;
  public id      : any ;
  public company : any ;
  public isReadyToSave : boolean;
  public form          : FormGroup;
  public imgOriginal   : any;
  public permissions : string = '';

  @ViewChild('fileInput') fileInput;

  
  constructor(public api : Api, public myapp: MyApp, private properties: Properties, private transfer: FileTransfer, private alertCtrl: AlertController, public formBuilder: FormBuilder, private actionSheetCtrl: ActionSheetController, private camera: Camera, public user: User, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {

    if (user.userInfo.image == 0){
      user.userInfo.image = '../assets/img/profile.jpg';
    }

    this.imgOriginal = user.userInfo.image;

    this.form = formBuilder.group({
      profilePic: ['']
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });


    this.form.patchValue({ 'profilePic':  user.userInfo.image  });

    this.permissions += 'Alta de  Contactos';

   
  }



  ionViewDidEnter() {

    this.menu.enable(true);
  }



  getPicture() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona la fuente',
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        },
        {
          text: 'Cámara',
          handler: () => {
            this.camera.getPicture({ destinationType: this.camera.DestinationType.DATA_URL, targetWidth: 400, targetHeight: 400, correctOrientation: true }).then((data) => {
              this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
              
              let alert = this.alertCtrl.create({
                title: 'Confirmar',
                message: '¿Cambiar imagen de perfil?',
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                      this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data  });
                    }
                  },
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.imgOriginal = this.form.controls['profilePic'].value;
                      this.uploadImage();
                    }
                  }
                ]
              });
              alert.present();


            }, (err) => {

              alert('No se pudo seleccionar la imagen');

            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();



  }

  processWebImage(event) {

    let reader = new FileReader();

    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;

      this.form.patchValue({ 'profilePic': imageData });

  
      let alert = this.alertCtrl.create({
        title: 'Confirmar',
        message: '¿Cambiar imagen de perfil?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.form.patchValue({ 'profilePic': this.imgOriginal });
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.imgOriginal = this.form.controls['profilePic'].value;
              this.uploadImage();
              this.user.userInfo.image = this.form.controls['profilePic'].value;
            }
          }
        ]
      });

      alert.present();

    };

    reader.readAsDataURL(event.target.files[0]);


  }

  getProfileImageStyle() {

    return 'url(' + this.form.controls['profilePic'].value + ')';

  }

  uploadImage() {

    var options = {
      fileKey : "image",
      fileName: 'image',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'm': 'uAvatar',
        'user': this.user.userInfo.userid,       
      }
    };


    var targetPath = this.form.controls['profilePic'].value;
    var fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.upload(targetPath, this.api.url, options).then(data => {
     
      if (data.responseCode == 200) {
        
        var response = JSON.parse(data.response);

        if (response.status == 200) {

        } else {
          this.api.alert(1003);
        }

      } else {
        this.api.alert(1002);
      }

    }, err => {
      this.api.alert(1001);
    });

  }  

  updateStatus(){
  
    
    var promise = this.user.loginPromise('m=loginbt&token=' + this.user.userToken);

    //Actualiza los datos de sesion del usuario.
    Promise.all([promise]).then(data => {

      //Si la sesion es correcta, carga los provides necesarios para iniciar la aplicacion
      if (data[0]) {

    
        var d = this.properties.init(this.user.userInfo.companyid);
        var e = this.properties.getUserProperties();

        //Espera la respuesta del servidor para los datos principales y despues oculta el splashScreen.
        Promise.all([d, e]).then(data => {
          this.myapp.sesion = false;
          this.ionViewDidEnter();
        });

      }

    });

  }
}