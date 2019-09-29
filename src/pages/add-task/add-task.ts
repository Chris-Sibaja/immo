
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ViewChild, Component,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { Properties,  User, Api } from '../../providers';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { AlertController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';


        
/**
 * 
 * 3:05
 * 
 * Tiempo 3 minutos
 * 
 * 
 * Tiempo  de 2 minutos para responder
 * 
 * 
 * FINAL   
 * 
 * 5 MINUTOS PRESENTACION
 * 
 * 
 * 
 * 5 MINUTOS DE PREGUNTAS
 * 
 * 
 * 
 * 
 * 
 * 
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {


  @ViewChild('fileInput') public fileInput;

  public isReadyToSave: boolean;
  public propertyImages: FormGroup;
  public propertyGeneral: FormGroup;
  public propertyPrices: FormGroup;
  public propertyLocation: FormGroup;
  public propertyInterior: FormGroup;
  public propertyDetail: FormGroup;
  public requiredLabelml = '';
  public requiredLabelm2c = '';


  public data: any = [];
  public success: boolean = false;
  public form: boolean = true;
  public edit: boolean = false;
  public msg: String = '';
  public propertyid: any;
  public gallery: any = [];
  public alertProperty: any;
  public filename: any;
  public icon: any;
  public update: boolean = false;

  public view2: { color: String, text: String, spinner: boolean, icon: boolean } = { color: 'b4', text: 'Seleccionar imagen', spinner: false, icon: false };
  public icons: { panel1: boolean, panel2: boolean, panel3: boolean, panel4: boolean, panel5: boolean, panel6: boolean, panel7: boolean }
    = { panel1: false, panel2: false, panel3: false, panel4: false, panel5: false, panel6: false, panel7: false };

  public color: { panel1: String, panel2: String, panel3: String, panel4: String, panel5: String, panel6: String }
    = { panel1: 're3', panel2: 're3', panel3: 're3', panel4: 're3', panel5: 're3', panel6: 're3' };


  public text: { panel1: String, panel2: String, panel3: String } = { panel1: 'Guardar', panel2: 'Guardar', panel3: 'Guardar' };

  public spinner: { panel1: boolean, panel2: boolean, panel3: boolean, panel4: boolean, panel5: boolean, panel6: boolean, panel7: boolean }
    = { panel1: false, panel2: false, panel3: false, panel4: false, panel5: false, panel6: false, panel7: false };

  public view: { panel1: boolean, panel2: boolean, panel3: boolean, panel4: boolean, panel5: boolean, panel6: boolean, panel7: boolean }
    = { panel1: true, panel2: false, panel3: false, panel4: false, panel5: false, panel6: false, panel7: false };
 

  /*** */





  public event = { user: 0, folio: 0, subject: "", startDate: "", startTime: "", endDate: "", endTime: "", reDate: "", reTime: "", descripcion: "" };

  contactUser: FormGroup;
  public client = false;
  public nameClient = '';
  public date: any;
  public time: any;
  public myDate: any;
  public monthName: any;
  public shortMonthName: any;
  public subjet: any = [];
  public calendars: any;
  public calendarId = 2;
  public phoneCalendar = false;

  public leadForm: FormGroup;

  constructor(public platform: Platform, public androidPermissions: AndroidPermissions, public api: Api, public alertCtrl: AlertController, private user: User, public camera: Camera, public params: NavParams, private actionSheetCtrl: ActionSheetController, private transfer: FileTransfer, public viewCtrl: ViewController, public properties: Properties, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {


    this.leadForm = formBuilder.group({
      subject: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

    this.propertyImages = formBuilder.group({
      profilePic: ['']
    });

    this.propertyImages.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.propertyImages.valid;
    });
  }
  valid(){

  
    if(this.leadForm.valid){
      return false;
    }else{

      return true;

    }
  }
    ionViewDidLoad() {
    //console.log('ionViewDidLoad AddTaskPage');
  } 


  save() { 
   
    let marker : any = [];


    if (this.event.subject == '1'){
      this.properties.properties.seccion_1.push({ 'name': 'Image', 'description': this.event.descripcion, 'lat': this.properties.userMarkCors.lat, 'lng': this.properties.userMarkCors.lng, 'image': this.getProfileImageStyle() });
    }else if(this.event.subject == '2'){
      this.properties.properties.seccion_2.push({ 'name': 'Image', 'description': this.event.descripcion, 'lat': this.properties.userMarkCors.lat, 'lng': this.properties.userMarkCors.lng, 'image': this.getProfileImageStyle() });

    } else if (this.event.subject == '3') {
      this.properties.properties.seccion_3.push({ 'name': 'Image', 'description': this.event.descripcion, 'lat': this.properties.userMarkCors.lat, 'lng': this.properties.userMarkCors.lng, 'image': this.getProfileImageStyle() });

    }
    
    console.log(this.properties.seccion_1);
  
    this.properties.generateMarks();
  }


  goCliente() {

    this.navCtrl.push('LeadPickeadPage', 'lead').then(() => {

      this.navCtrl.getActive().onDidDismiss(data => {
        //console.log(data);
        if (data) {
          //console.log('si');
          this.client = true;
          this.nameClient = data.fullname;
          this.event.folio = data.folio;
        } else {
          //console.log('no');
          this.client = false;
        }
      });
    });

  }

  close() {

    let alert = this.alertCtrl.create({
      title: 'Atención',
      message: 'Se perderá la información del formulario',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: () => {

            this.viewCtrl.dismiss({ data: 'reload' });
            
          }
        }
      ]
    });

    alert.present();

  }

  process(type) {


    if (this.isReadyToSave) {

      this.uploadImage(type);

    } else {

      this.getPicture();
    }

  }

  uploadImage(type) {

    //Crear un providr para subida de archivos, no estaria nada mal.

    var doc = '';
    var m = '';


    if (type == 1) {

      this.spinner.panel6 = true;
      doc = 'image';
      m = 'upProperty';

    } else {

      this.spinner.panel3 = true;
      doc = 'file';
      m = 'udProperty';
    }

    var targetPath = this.propertyImages.controls['profilePic'].value;
    var fileTransfer: FileTransferObject = this.transfer.create();

    var options = {
      fileKey: doc,
      fileName: this.filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'm': m,
        'user': this.user.userInfo.userid,
        'token': this.user.userToken,
        'folio': this.propertyid,
        'type': 1
      }
    };


    var $this = this;


    fileTransfer.upload(targetPath, this.api.urlRoot, options).then(data => {



      if (data.responseCode == 200) {
        var response = JSON.parse(data.response);



        JSON.parse(data.response)

        if (response.status == 200) {
          //Actualiza las propiedades y sus imagenes
          this.properties.getUserProperties();

          this.alertProperty = this.alertCtrl.create({
            title: '¡Imagen subida correctamente!',
            buttons: ['Aceptar']
          });

          this.alertProperty.present();

        } else {

          this.api.alert(601);
        }
      } else {
        this.api.alert(600);
      }

      if (type == 1) {
        this.spinner.panel6 = false;
      } else {
        this.spinner.panel3 = false;
      }

      $this.isReadyToSave = false;


    }, err => {
      this.api.alert(602);
    });

  }

  getPicture() {



    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona la fuente',
      buttons: [{
        text: 'Galería',
        handler: () => {

          this.fileInput.nativeElement.click();

        }
      }, {
        text: 'Cámara',
        handler: () => {
          this.camera.getPicture({ destinationType: this.camera.DestinationType.DATA_URL, targetWidth: 1600, correctOrientation: true }).then((data) => {

            this.propertyImages.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
            var d = new Date();
            var n = d.getTime();
            this.filename = 'foto_' + n + '.jpg';
            this.gallery.push('data:image/jpg;base64,' + data);
            this.view2.color = 'green';
            this.view2.text = 'Cargar foto';
          }, (err) => {
            alert('No se pudo seleccionar la imagen');
          });
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });

    actionSheet.present();
  }

  processWebImage(event) {

    let reader = new FileReader();


    reader.onload = (readerEvent) => {


      var fullPath = this.fileInput.nativeElement.value;

      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));


      var filename = fullPath.substring(startIndex);


      this.view2.color = 'green';

      this.view2.text = 'Cargar foto';


      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        this.filename = filename.substring(1);


      }

      let imageData = (readerEvent.target as any).result;

      this.propertyImages.patchValue({ 'profilePic': imageData });

    };

    reader.readAsDataURL(event.target.files[0]);

  }

  getProfileImageStyle() {
    return 'url(' + this.propertyImages.controls['profilePic'].value + ')';
  }


}
