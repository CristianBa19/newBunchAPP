import { IntroductionPage } from './../introduction/introduction';
import { CarListPage } from './../car-list/car-list';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecoveryPage } from '../recovery/recovery';
import { RegistrerPage } from '../registrer/registrer';
import { HomePage } from '../home/home';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Login2Page } from '../login2/login2';
import { AuthProvider } from '../../providers/auth/auth';
import { usercreds } from '../../models/interfaces/usercreds';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ValidateEmail } from '../../app/validators/email.validator';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
    credentials = {} as usercreds;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage, public authservice: AuthProvider) { }
    //email: string;
    //pass: string;
    message: string;
    isEnabled: boolean;
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            user: new FormControl('', [Validators.required, ValidateEmail]),
            pass: new FormControl('', [Validators.required, Validators.minLength(7)]),
        });
    }

    onSubmit(form: FormGroup) {
        console.log({form});
        if (form.valid === true) {
            this.goIntro();    
        } else {
            this.message = 'E-mail o password incorrecto';
        }        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    createAccount = () => {
        this.navCtrl.push(RegistrerPage, { animate: true });
    }

    forgotPass = () => {
        this.navCtrl.push(RecoveryPage, { animate: true });
    }

    goCarList = () => {
        this.navCtrl.push(CarListPage, { animate: true });
    }
    goCarList2 = () => {
        this.navCtrl.push(Login2Page, { animate: true });
    }
    goIntro = () => {

        console.log('goIntro');

        this.message = '';
        this.isEnabled = false;

        let email = this.credentials.email,
            pass = this.credentials.password;

        console.log({email, pass});

        if (email != undefined && pass != undefined) {

            email = email.trim();
            pass = pass.trim();

            if (this.validateEmail(email) !== true) {
                this.message = 'Debes ingresar el e-mail del usuario';
                this.isEnabled = true;
            } else {

                let string = `usuario=${email}&password=${pass}`,
                    encodedString = btoa(string),
                    url = `http://services.bunch.guru/WebService.asmx/Login?param=${encodedString}`;

                console.log({string, encodedString, url});

                this.http.get(url)
                    .map(res => res.json())
                    .subscribe(data => {

                        console.log({ data });

                        switch (data.respuesta) {
                            case 'true':
                                this.storage.set('name', data.idContVend);
                                this.signin();
                                break;
                            case 'false':
                                this.isEnabled = true;
                                this.message = 'Verifica tu contraseña';
                                break;
                            case 'No existe usuario':
                                this.isEnabled = true;
                                this.message = 'El usuario no existe';
                                break;
                            default:
                                this.isEnabled = true;
                                this.message = 'Hubo un error, intenta de nuevo';
                        }
                    }, err => {
                        console.log("el usuario no existe");
                    });
            }
        } else {
            this.isEnabled = true;
            if (email == undefined) {
                this.message = 'El campo usuario no puede estar vacío';
            } else {
                this.message = 'El password no puede estar vacío';
            }
        }
    }

    signin() {
        this.authservice.login(this.credentials).then((res: any) => {
            if (!res.code) {
                this.navCtrl.push(IntroductionPage, { animate: true });
            } else {
                console.error({res});
            }
        });
    }

    validateEmail(email: string): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}