import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';

import { DataService } from '../core/data.service';
import { IPostModel, IPost } from '../shared/interfaces';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit {

    @ViewChild("fileInput") fileInput: any;
    location: '';

    newPost: IPostModel = {
        userId: 0,
        firstName: '',
        lastName: '',
        city: '',
        country: '',
        gender: 'male',
        domain: '',
        description: ''
    };

    posts: IPost[];
    postsAfterFiltering: IPost[];
    myPost: IPost;

    profileEmail: string = "email";
    profileUserName: string;
    profileDisplayName: string;
    profileUserId: number;
    showMyProfile: boolean = false;
    showMyPost: boolean = false;
    arrowValue: boolean = false;
    showPostMessage: boolean = false;

    message = "";
    messagePost = "";
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
        this.profileUserId = Number(localStorage.getItem("userId"));
        this.getPosts();
        this.getMyPost();
    }

    logout() {
        localStorage.clear();
        this.router.navigate(["login"]);
    }

    onChangeSlider() {
        if (this.myValueSlider < this.posts.length) {
            this.postsAfterFiltering = this.posts.slice(0, this.myValueSlider);
        } else {
            this.postsAfterFiltering = this.posts;
        }
        this.location = "";
    }

    searchByLocation(event: any) {
        if (event.keyCode == 13) {
            let searchL = this.location;
            this.dataService.getPostsByLocation(searchL)
                .subscribe((posts: IPost[]) => {
                        this.postsAfterFiltering = posts;
                        this.showMyProfile = false;
                        this.showMyPost = false;
                        this.myValueSlider = posts.length;
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        }
    }

    resetFormFields() {
        this.location = "";
        this.myValueSlider = this.posts.length;
        this.postsAfterFiltering = this.posts;

    }

    showProfile() {
        this.showMyPost = false;
        this.showMyProfile = !this.showMyProfile;
    }

    showPost() {
        this.showMyProfile = false;
        this.showMyPost = !this.showMyPost;
    }

    changeArrowValue() {
        this.arrowValue = !this.arrowValue;
        this.message = "";
    }

    getPosts() {
        this.dataService.getPosts()
            .subscribe((posts: IPost[]) => {
                this.posts = posts;
                this.postsAfterFiltering = posts;
                this.myValueSlider = this.posts.length;
            });
    }

    getMyPost() {
        let myId = localStorage.getItem("userId");
        this.dataService.getPost(Number(myId))
            .subscribe((post: IPost) => {
                    this.myPost = post;
                    this.showPostMessage = false;
                    this.messagePost = "";
                },
                (err) => {
                    this.messagePost = "You did not post anything";
                    this.showPostMessage = true;
                }
            );
    }

    submit() {
        let fi = this.fileInput.nativeElement;
        let fileToUpload: any;
        if (fi.files && fi.files[0]) {
            fileToUpload = fi.files[0];
        }
        console.log(this.newPost);
        this.newPost.userId = ((localStorage.getItem("userId")) as any);
        this.dataService.insertPost(this.newPost, fileToUpload)
            .subscribe((newpost: IPostModel) => {
                    if (newpost) {
                        console.log('Done');
                    } else {
                        console.log('Unable to insert new post :(');
                    }
                    console.log(this.newPost.fileToUpload);
                    console.log(this.newPost);
                    this.message = 'post has been successfully added';
                    this.statusRegister = true;
                    this.getPosts();
                    this.getMyPost();
                    this.showMyPost = false;
                    this.showMyProfile = false;
                },
                (err) => {
                    this.message = 'you can share only one post, sorry...';
                    this.statusRegister = false;
                    console.log(err);
                }
        );

        

    }

    deletePost() {
        this.dataService.deletePost(Number(this.myPost.id))
            .subscribe((rsp) => {
                    console.log(rsp);
                    this.getPosts();
                    this.showMyProfile = false;
                    this.showMyPost = false;
                    this.getMyPost();
                },
                (err) => {
                    console.log("something went wrong :(");
                }
            );
    }
}