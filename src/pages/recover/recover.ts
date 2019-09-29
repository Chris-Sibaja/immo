import { Component                                            } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators                   } from '../../../node_modules/@angular/forms';
@IonicPage()
@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})

export class RecoverPage {
  public pass2 : any ;
  public pass = false;
  public email = true;
  public vcode = false;
  btnAdd      = false;
  spinner     = false;
  data : any  = [] ;
  msg         = '' ;
  resend      = false;
  public commentForm: FormGroup;

  btnAdd2      = false;
  spinner2     = false;
  data2 : any  = [] ;
  msg2         = '' ;
  count = 20;
  sending:Boolean = true;
  public commentForm2 : FormGroup;

  public code = 23987423987239872389;
  public code2 : any;

  public commentForm3 : FormGroup;

  constructor(public alertCtrl :AlertController,  public formBuilder: FormBuilder,  public navCtrl: NavController, public viewCtrl : ViewController, public navParams: NavParams) {
    
    this.commentForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
    this.commentForm3 = formBuilder.group({
      pass2: ['', [Validators.required]],
      pass3: ['', [Validators.required]]
    });
      
    this.commentForm2 = formBuilder.group({
      code2: ['', [Validators.required]]
    });

  } 
  change(){
    this.vcode = false;
    this.email = true;
  }

  addComment(){
    var $this     = this;
    if($this.sending){
      setInterval(function (){
        if($this.count == 0){
          document.getElementById("resend").removeAttribute("disabled"); 
          $this.count = 0;
          $this.resend = true;
        }else if(!$this.resend){
          $this.count = $this.count - 1;
        }else{
          $this.count = 20;
        }
      },1000);
      $this.sending = false;
    }

    $this.count = 20;
    $this.resend = false;

    if(this.btnAdd)
      return;

    this.btnAdd   = true;
    this.spinner  = true;
    this.code = Math.round( (Math.random()*100000));
    //var input = this.inputs.recover(this.data.email, this.code);

    this.spinner = false;
    this.vcode = true;
    this.email = false;
    this.msg = '';
    this.btnAdd = false;

    Promise.all([this.msg ]).then(data => {
      
      this.spinner = false;

      if(data[0]){
        this.vcode = true;
        this.email = false;


        this.msg = 'Enviamos un código para reiniciar tu contraseña';

        setTimeout(() => {
          //$this.viewCtrl.dismiss();
        }, 1000);

      }else{
        $this.btnAdd = false;
      }
   
    }); 
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  addCode(){





    ////console.log(this.code, '--', parseInt(this.code2));
    if(this.code == parseInt(this.code2)  ){
      ////console.log('pasa');
      this.pass = true;
      this.vcode = false;
    }else{
      ////console.log('no pasa');

      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Código incorrecto',
        buttons: [
        
          {
            text: 'Aceptar',
            handler: () => {
             
            }
          }
        ]
      });

      alert.present();



    }
  } 

  addPass(){


    ////console.log(this.pass2);
    ////console.log(this.data.email);
    //var promesa = this.inputs.changePassword( this.data.email, this.pass2);

   var promesa = '';

    Promise.all([promesa]).then(data => {
      if(data[0]){
        let alert = this.alertCtrl.create({
          title: 'Éxito',
          message: 'Se ha cambiado la contraseña correctamente',
          buttons: [
          
            {
              text: 'Aceptar',
              handler: () => {
                this.viewCtrl.dismiss();
              }
            }
          ]
        });
    
        alert.present();
      }else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Ocurrió un problema, intenta mas tarde',
          buttons: [
          
            {
              text: 'Aceptar',
              handler: () => {
                this.viewCtrl.dismiss();
              }
            }
          ]
        });
    
        alert.present();
      }


    });


  }

  resendActivate(){
    this.resend = false;
    document.getElementById("resend").setAttribute("disabled","true"); 
  }

}
