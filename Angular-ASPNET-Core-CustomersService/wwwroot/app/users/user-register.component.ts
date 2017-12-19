import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import {  IUser, IState } from '../shared/interfaces';

@Component({
    selector: 'user-register',
    templateUrl: './user-register.component.html'
})
export class UserRegisterComponent implements OnInit {
    user: IUser = {
        userName: '',
        password: '',
        email: '',
        displayName: '',

    };
   
    errorMessage: string;
    deleteMessageEnabled: boolean;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService) { }

    ngOnInit() {
        
    }

    submit() {

            this.dataService.insertUser(this.user)
                .subscribe((user: IUser) => {
                    if (user) {
                        this.router.navigate(['/customer']);
                    }
                    else {
                        this.errorMessage = 'Unable to add user';
                    }
                },
                (err: any) => console.log(err));

    }
    

    cancel(event: Event) {
        event.preventDefault();
        this.router.navigate(['/']);
    }


}