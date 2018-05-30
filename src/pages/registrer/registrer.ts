import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../login/login';
import { StatisticsPage } from '../statistics/statistics';
import { HomePage } from '../home/home';
import { LocalizationModel } from '../../_helpers/localizationModel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Console } from '@angular/core/src/console';
import { FormGroup, FormControl, Validators, EmailValidator  } from '@angular/forms';
import { ValidateEmail } from '../../app/validators/email.validator';
@Component({
    selector: 'page-registrer',
    templateUrl: 'registrer.html',
    providers: [Keyboard],

})
export class RegistrerPage {


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public dPicker: DatePicker,
        private kBoard: Keyboard,
        private platform: Platform,
        private localizationModal: LocalizationModel,
        public http: Http,
        private storage: Storage,
        public userservice: UserProvider,
        public loadingCtrl: LoadingController, 
        public toastCtrl: ToastController) {

    }
    myForm: FormGroup;
    message: string;    
    newuser = {
        email: '',
        password: '',
        celular: '',
        displayName: '', //si quitamos el displayName fireBase marca error en el signup
    }
    emailUser: any;
    passwordUser: any;
    celularUser: any;
    validEmail;
    validPass;
    validCel;
    email:string;
    password:string;
    cel:number;

    
    onSubmit(form: FormGroup) {
        
        /*this.validateEmail().then((res) => {            
            if (res == true && this.validatePassword() == true && this.validateTelefono() == true) {
                this.signup();
            } else {
                //alert('Error');
            }
        }).catch((err) => {
            console.error({err});
        });*/
        
        /*if (this.validar=="True") {
            this.validatePassword();
        } else if (this.validar=="True") {
            this.validateTelefono();
        } else if (this.validar=="True") {
            this.signup();
        }*/

        // console.log({form});
        // if (form.valid === true) {
        //     // this.goIntro();    
        // } else {
        //     this.message = 'E-mail o password incorrecto';
        // }        
    }
    ReturnLoginPage = () => {
        this.navCtrl.push(LoginPage, { animate: true });
    }
    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl('', [Validators.required, ValidateEmail]),
            password: new FormControl('', [Validators.required, Validators.minLength(7)]),
            celular: new FormControl('', [Validators.required, Validators.minLength(10)]),
        });
    }
    /*async validateEmail() {
        let email = this.newuser.email,
            toaster,
            loader = this.loadingCtrl.create({
                content: 'Validando E-Mail',
                dismissOnPageChange: true,
            });
            toaster = this.toastCtrl.create({
                duration: 3000,
                position: 'bottom'
            });    
        
        loader.present();
        toaster.dismiss();

        if (email == undefined) {
            loader.dismiss();        
            toaster.setMessage('Se necesita llenar todos los campos');
            toaster.present();
            return false;       
        } else {

            email = email.trim();

            if (email.length > 0) {

                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(String(email).toLowerCase()) === true) { //check if valid regex email

                        
                    //Checamos si el email ya esta registrado en firebase
                    let userAlreadyExists = await this.userservice.userAlreadyExists(this.newuser.email);
                    if (userAlreadyExists === true) {
                        loader.dismiss();
                        toaster = this.toastCtrl.create({
                            duration: 3000,
                            position: 'bottom'
                        });            
                        toaster.setMessage('El E-Mail ya se encuentra registrado');                        
                        toaster.present(); 
                        return false;           
                    } else {
                        //Si no esta registrado, ahora checamos que no se encuentre registrado en bunch.guru
                        
                        let string = `email=${email}`,
                            encodedString = btoa(string),
                            url = `http://services.bunch.guru/WebService.asmx/validarCliente?param=${encodedString}`;

                        let promise = new Promise((resolve, reject) => {
                            this.http.get(url).map(res => res.json()).subscribe(data => {                                    
                                switch(+data.status) {
                                    case 1:
                                        //el email esta disponible, quiere decir que podemos registrarlo
                                        //asi que pasamos al siguiente slide
                                        //this.getCode();
                                        toaster.dismiss(); 
                                        loader.dismiss(); 
                                        this.newuser.email = email;                                        
                                        resolve(true);
                                        break;
                                    //case 2:
                                    //    //existe pero con info incompleta (se supone que por el cambio de forma de crear cuentas ahora esto nunca deberia pasar)
                                    //    break;
                                    //case 3:
                                    //    //existe con la info completa
                                    //    break;
                                    default:
                                        loader.dismiss();
                                        toaster = this.toastCtrl.create({
                                            duration: 3000,
                                            position: 'bottom'
                                        });            
                                        toaster.setMessage('El E-Mail ya se encuentra registrado');                                        
                                        resolve(false);
                                        toaster.present();
                                        break;
                                }
                                
                            }, err => {                                    
                                console.error({err});
                                reject(err);
                            });                            
                        });
                        console.log({promise});

                        return await promise;
                    }                                                     

                } else {
                    loader.dismiss();
                    toaster = this.toastCtrl.create({
                        duration: 3000,
                        position: 'bottom'
                    });            
                    toaster.setMessage('Indique un email válido');                    
                    toaster.present();
                    return false;
                }                
            } else {
                loader.dismiss();
                toaster = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });            
                toaster.setMessage('Se necesita llenar todos los campos');                
                toaster.present();    
                return false;
            }
        }        
    }*/
    
    private validateEmail(): boolean {
        let email = this.email;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(String(email).toLowerCase());
        if (result === true) {            
            this.validEmail = true;
            return true;
        } else {            
            this.validEmail = false;
            return  false;
        }
    }
    
    validatePassword() {

        let toaster,
            loader = this.loadingCtrl.create({
                content: 'Validando Contraseña',
                dismissOnPageChange: true,
            });
        
        loader.present();

            if (this.newuser.password.length < 7) {
                loader.dismiss();
                toaster = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });            
                toaster.setMessage('El password debe ser por lo menos de 7 caracteres');                
                toaster.present();
                return false;
            } else {
                //password is valid, lets save it and pass to the next slide
                //this.getUpdateContasenaCuenta();                
                loader.dismiss();
                return true;
            }            

    }

    validateTelefono():boolean {

        let toaster,
            loader = this.loadingCtrl.create({
                content: 'Validando celular',
                dismissOnPageChange: true,
            });
        
        loader.present();

            if (this.newuser.celular.length < 10) {
                loader.dismiss();
                toaster = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });            
                toaster.setMessage('El celular debe ser por lo menos de 10 caracteres');                
                toaster.present();
                return false;
            } else {
                //password is valid, lets save it and pass to the next slide
                //this.getUpdateContasenaCuenta();                
                loader.dismiss();
                return true;
            }            

    }

    signup() {

        console.log('signup');
        let that = this;
        let loader = this.loadingCtrl.create({
            dismissOnPageChange: true,
        });
        loader.present();            
        
        var toaster = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
        });
        
        if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.celular == '') {
            toaster.setMessage('Se necesita llenar todos los campos');
            toaster.present();
            loader.dismiss();
        } else if (this.newuser.password.length < 7) {
            toaster.setMessage('El password deberá de ser de 7 caracteres');
            toaster.present();
            loader.dismiss();
        } else {

            //Registrar en la db de bunch.guru
            let string = `celular=${this.newuser.celular}&password=${this.newuser.password}&email=${this.newuser.email}`,
                encodedString = btoa(string),
                url = `http://services.bunch.guru/WebService.asmx/CrearCuenta?param=${encodedString}`;

            console.log({string, encodedString, url});
            this.http.get(url).map(res => res.json()).subscribe(data => {
                console.log({data});
                //this.getCotSeguridad(data);
                //this.codeEnviar = data;                

                //Registrar en firebase
                this.userservice.adduser(this.newuser).then((res: any) => {                                    
                    if (res.success) {
                        console.log("se ha creado una nueva cuenta");
                        localStorage.idContVend = data.IdVend;
                        that.storage.set('name', data.idContacto);
                        that.navCtrl.push(HomePage, { animate: true });
                    } else {
                        console.error({res});
                        loader.dismiss();
                    }                    
                }).catch((a) => {
                    console.error('error!', {a});
                    loader.dismiss();
                });
            }, err => {
                console.error('error->', {err});
                loader.dismiss();
            });                
        }
    }

    private toLoginPage() {
        this.navCtrl.push(LoginPage, { animate: true });
    }

    private emailChange(a) {
        if (a.length == 0) {
            this.validEmail = undefined;
        } else { 
            this.validateEmail();
        }
    }

    private passChange(pass) {
        if (pass.length == 0) {
            this.validPass = undefined;
        } else { 
            this.validatePass();
        }
    }

    private validatePass() {
        let pass = this.password;
        if (pass.length >= 6) {
            this.validPass = true;
            return true;
        } else {
            this.validPass = false;
            return false;
        }
    }

    private celChange(cel) {
        if (cel.length == 0) {
            this.validCel = undefined;
        } else { 
            this.validateCel();
        }
    }    

    private validateCel() {
        return true;
    }
}