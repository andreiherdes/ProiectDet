import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IPostModel, IPost } from '../shared/interfaces';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit {

    newPost: IPostModel = {
        userId: 0,
        firstName: '',
        lastName: '',
        city: '',
        country: '',
        gender: 'male',
        domain: '',
        description: '',
    };

    posts: IPost[];

    profileEmail: string = "email";
    profileUserName: string;
    profileDisplayName: string;
    showMyProfile: boolean = false;
    arrowValue: boolean = false;

    message = "";
    statusRegister: boolean = false;

    myValueSlider = 0; 
    constructor(private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService) {

        
    }

    ngOnInit() {
        if (!localStorage.getItem("email")) {
            this.router.navigate(["login"]);
        }

        this.profileEmail = localStorage.getItem("email");
        this.profileUserName = localStorage.getItem("userName");
        this.profileDisplayName = localStorage.getItem("displayName");
        this.getPosts();
    }

    logout() {
        localStorage.clear();
        this.router.navigate(["login"]);
    }

    onChangeSlider() {
        console.log(this.myValueSlider);
    }

    showProfile() {
        this.showMyProfile = !this.showMyProfile;
    }

    changeArrowValue() {
        this.arrowValue = !this.arrowValue;
        this.message = "";
    }

    getPosts() {
        this.dataService.getPosts()
            .subscribe((posts: IPost[]) => {
                this.posts = posts;
            });
    }

    submit() {
        console.log(this.newPost);
        this.newPost.userId = ((localStorage.getItem("userId")) as any);
        this.dataService.insertPost(this.newPost)
            .subscribe((newpost: IPostModel) => {
                    if (newpost) {
                        console.log('Done');
                    } else {
                        console.log('Unable to insert new post :(');
                    }
                    this.message = 'post has been successfully added';
                    this.statusRegister = true;
                    this.getPosts();
                },
                (err) => {
                    this.message = 'you can share only one post, sorry...';
                    this.statusRegister = false;
                    console.log(err);
                }
        );

        

    }
}