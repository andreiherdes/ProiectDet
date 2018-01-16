import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IUser, ILoginModel } from '../shared/interfaces';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
   
})
export class LoginComponent implements OnInit {

    view = true;
    user: IUser = {
        userName: '',
        password: '',
        email: '',
        displayName: '',

    };

    loginModelTransfer: ILoginModel = {
        email: '',
        password: '',
    }

    errorMessage: string;
    succesMessage: string;
    message: string;
    loginMessage: string;
    statusRegister:boolean = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService) {
 
    }

    ngOnInit() {
        if (localStorage.getItem("email")) {
            this.router.navigate(["dashboard"]);
        }
    }

    toggle() {
        this.view = !this.view;
        this.message = "";
        this.loginMessage = "";
    }

    register() {
        this.dataService.insertUser(this.user)
            .subscribe((user: IUser) => {
                    if (user) {
                        
                    }
                    else {
                        this.errorMessage = 'Unable to add user';
                    }
                    this.message = 'you have successfully registered';
                    this.statusRegister = true;
                },
            (err) => { console.log(err);
                this.message = 'this email already exists';
                this.statusRegister = false;
            });
        
    }

    login(formData: any) {
        this.loginModelTransfer.email = formData.email;
        this.loginModelTransfer.password = formData.password;
        console.log(this.loginModelTransfer.password);
        this.dataService.loginMethod(this.loginModelTransfer)
            .subscribe((loginModel: ILoginModel) => {
                    if (loginModel) {
                        console.log('Done');
                    } else {
                        this.errorMessage = 'Unable to add user';
                        this.loginMessage = "your email or password are wrong";
                    }
                },
            (err) => {
                console.log("bla bla");
                this.loginMessage = "your email or password are wrong";
            }
        );
    }
}