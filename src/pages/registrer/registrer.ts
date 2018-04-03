import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../login/login';
import { LocalizationModel } from '../../_helpers/localizationModel';
import { Http, Headers } from '@angular/http';
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
        public userservice: UserProvider,
        public loadingCtrl: LoadingController, 
        public toastCtrl: ToastController) {

    }
    myForm: FormGroup;
    message: string;
    validar: string;
    newuser = {
        email: '',
        password: '',
        celular: ''
    }
    emailUser: any;
    passwordUser: any;
    celularUser: any;

    
    onSubmit(form: FormGroup) {
        this.validar="False"
        this.validateEmail();
        if (this.validar=="True"){
            this.validatePassword();
        }else if(this.validar=="True") {
            this.validateTelefono();
        }else if(this.validar=="True"){
            this.signup();
        }
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
    async validateEmail() {
        let email = this.newuser.email,
            toaster,
            loader = this.loadingCtrl.create({
                content: 'Validando E-Mail'
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
                            this.validar="False"
                            toaster.present();            
                        } else {
                            //Si no esta registrado, ahora checamos que no se encuentre registrado en bunch.guru

                            console.log('validar cliente por service...');
                            let string = `email=${email}`,
                                encodedString = btoa(string),                        
                                url = `http://services.bunch.guru/WebService.asmx/validarCliente?param=${encodedString}`;

                            this.http.get(url)
                                .map(res => res.json())
                                .subscribe(data => {
                                    console.log('validar cliente por service...', {data});
                                    switch(+data.status) {
                                        case 1:
                                            //el email esta disponible, quiere decir que podemos registrarlo
                                            //asi que pasamos al siguiente slide
                                            //this.getCode();
                                            toaster.dismiss(); 
                                            loader.dismiss(); 
                                            this.newuser.email = email;
                                            this.validar="True"      
                                            break;
                                        /*case 2:
                                            //existe pero con info incompleta (se supone que por el cambio de forma de crear cuentas ahora esto nunca deberia pasar)
                                            break;
                                        case 3:
                                            //existe con la info completa
                                            break;*/
                                        default:
                                            loader.dismiss();
                                            toaster = this.toastCtrl.create({
                                                duration: 3000,
                                                position: 'bottom'
                                            });            
                                            toaster.setMessage('El E-Mail ya se encuentra registrado');
                                            this.validar="False"
                                            toaster.present();
                                            break;
                                    }
                                    
                                }, err => {
                                    console.error({err});
                                });                            
                        }                        
                             

                } else {
                    loader.dismiss();
                    toaster = this.toastCtrl.create({
                        duration: 3000,
                        position: 'bottom'
                    });            
                    toaster.setMessage('Indique un email válido');
                    this.validar="False"
                    toaster.present();        
                }                
            } else {
                loader.dismiss();
                toaster = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });            
                toaster.setMessage('Se necesita llenar todos los campos');
                this.validar="False"
                toaster.present();    
            }
        }        
    } 
    
    validatePassword() {

        let toaster,
            loader = this.loadingCtrl.create({
                content: 'Validando Contraseña'
            });
        
        loader.present();

            if (this.newuser.password.length < 7) {
                loader.dismiss();
                toaster = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });            
                toaster.setMessage('El password debe ser por lo menos de 7 caracteres');
                this.validar="False"
                toaster.present();
            } else {
                //password is valid, lets save it and pass to the next slide
                //this.getUpdateContasenaCuenta();
                this.validar="True"                
                loader.dismiss();
            }            

    }

    validateTelefono() {

        let toaster,
            loader = this.loadingCtrl.create({
                content: 'Validando celular'
            });
        
        loader.present();

            if (this.newuser.celular.length < 10) {
                loader.dismiss();
                toaster = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });            
                toaster.setMessage('El celular debe ser por lo menos de 10 caracteres');
                this.validar="False"
                toaster.present();
            } else {
                //password is valid, lets save it and pass to the next slide
                //this.getUpdateContasenaCuenta();
                this.validar="True"                
                loader.dismiss();
            }            

    }

    signup() {

        console.log('signup');

        let loader = this.loadingCtrl.create({
            content: 'Actualizando'
        });
        loader.present();            

        // this.newuser.displayName = this.nombreUser + ' ' + this.apellidoPUser + ' ' + this.apellidoMUser;        
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
                url = `http://localhost:51505/WebService.asmx/CrearCuenta?param=${encodedString}`;

            console.log({string, encodedString, url});
            this.http.get(url)
            .map(res => res.json())
            .subscribe(data => {
                console.log({data});            
                //this.getCotSeguridad(data);
                //this.codeEnviar = data;                

                //Registrar en firebase
                this.userservice.adduser(this.newuser).then((res: any) => {                                    
                    if (res.success) {
                        console.log("se ha creado una nueva cuenta");
                        loader.dismiss();
                    } else {
                        console.error({res});
                        loader.dismiss();
                    }                    
                }).catch(() => {
                    console.error('error');
                    loader.dismiss();
                });
            }, err => {
                console.error({err});
                loader.dismiss();
            });                
        }
    }
}