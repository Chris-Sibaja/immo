
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController } from 'ionic-angular';
import { Calendar, CalendarOptions } from '@ionic-native/calendar';
import { Storage } from '@ionic/storage';
import { User, Properties }from '../../providers';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';



@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

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

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController,    public navParams: NavParams,    private storage: Storage,    public alertCtrl: AlertController,    private calendar: Calendar,    public platform: Platform,private user: User,public viewCtrl: ViewController) {


    this.leadForm = formBuilder.group({
      subject: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
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

    console.log(this.event.subject);
    console.log(" - ");
    console.log(this.event.descripcion)

    switch (this.event.subject) {
      case '1':
        
        break;
      case '2':

        break;
      case '3':

        break;
      default:
        break;
    }

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

}
