import { Component }                                from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { User, Properties }     from '../../providers';
import { MyApp }                                    from '../../app/app.component';
import { FormBuilder, FormGroup, Validators       } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({ 
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

export class WelcomePage {

  public loginData: { user: string, password: string } = { user: null, password: null };
  public signupData: { fullname: string, email: string, cellphone: String, tipoid: Number, passOne: String, passTwo: String } = { fullname: null, email: null, cellphone: null, tipoid : null, passOne: null, passTwo: null };
  
  public btnLogin     = false;
  public btnSingup    = false;
  public loginForm    : FormGroup;
  public signupForm   : FormGroup;
  public passValidate = false;
  public md5Pass      = '';

  /**Variable para manejar todos los objetos que deban mostrarse en pantalla */
  public view: {
    signup            : boolean,
    errorSignupOther  : boolean,
    errorSignup       : boolean,  
    success           : boolean,
    error             : boolean,
    segment           : any,
    spinner           : { login: boolean, signup: boolean, loadkey: boolean },
    login             : { text: string }
  } = {
    signup            : true,
    errorSignupOther  : false,
    errorSignup       : false,
    success           : false,
    error             : false,
    segment           : 'login',
    spinner           : { login: false, signup: false, loadkey: false },
    login             : { text: 'Iniciar sesión'}
  };

  constructor(public iab: InAppBrowser, public app: MyApp, public formBuilder: FormBuilder, public properties: Properties,public user : User,public navCtrl: NavController, private menu: MenuController) { 

    this.loginForm = formBuilder.group({
      user  : ['', [Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signupForm = formBuilder.group({
      name      : ['', [Validators.required]],
      email     : ['', [Validators.email]],
      cellphone: ['', [Validators.required]],
      usertype: ['', [Validators.required]],
      passOne:  ['', [Validators.required]],
      passTwo:  ['',[Validators.required]]
    });
    ////console.log(this.signupForm);
  }

  /**Solicita una sesion y redirecciona a la paina correcta*/
  login() {

    if(this.btnLogin)
      return;

    
    this.btnLogin = true

    this.view.spinner.login = true;
    let body = '&email=' + this.loginData.user + '&password=' +  this.loginData.password;

    this.user.login(body).subscribe((data) => {

      if(data.status == 200){

        if(data.json().status == 200){
          this.user.SetuserInfo = data.json().data; 
     

            var c = this.properties.init(this.user.userInfo);
   
            this.view.login.text = 'Cargando inventario..';  

            Promise.all([c]).then(data => {


              if (this.user.userInfo.global == 1) { 

                this.navCtrl.setRoot('MapInventoryPage'), {}, { animate: true, direction: 'forward' };

              }else{

                this.navCtrl.setRoot('EnlaceBroknetPage'), {}, { animate: true, direction: 'forward' };

              }

               this.app.sesion = false;
               
     

            });

       

        }else{

          this.view.error = true;
          this.view.spinner.login = false;  
          this.btnLogin = false;


        }
      }else{

        this.view.error = true;
        this.view.spinner.login = false;  
        this.btnLogin = false;


      }

    });
  }

  signup() {

    if (this.btnSingup)
      return;

    this.btnSingup = true


    this.view.spinner.signup = true;

    let body =  'm=signup'    +
                '&email='     + this.signupData.email + 
                '&cellphone=' + this.signupData.cellphone + 
                '&fullname='  + this.signupData.fullname +
                '&tipoid='    + this.signupData.tipoid +
                '&secretword='+ this.signupData.passOne;
    
    
    this.user.signup(body).subscribe((data) => {

      if(data.status == 200 ){
        var info = data.json();

        if (info.status == 200){
          this.user.userToken = info.data.token;
          this.view.success = true;
          this.view.signup = false;
          this.view.spinner.signup = false;
        } else if (info.status == 311) {
          this.view.errorSignup = true;
          this.view.spinner.signup = false;
        }else {
          this.view.errorSignupOther = true;
        }

      }

      this.btnSingup = false;
    });

  }

  ionViewDidEnter() {
    this.loginData.user = '';
    this.menu.enable(false);
  }

  terms(){


    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    this.iab.create('http://broknet.immomexico.com/view/assets/docs/termino.pdf', '_system', options);
  }

  recover(){
    this.navCtrl.push('RecoverPage');
    
  }

  validate(){
    var $this = this;

    if($this.signupData.passOne == $this.signupData.passTwo){
      $this.passValidate = true;

    }else{
      $this.passValidate = false;
    }

  }


}
