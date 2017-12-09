import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'musicians',
    templateUrl: './musicians.component.html'
})
export class MusiciansComponent {
    public musicians: Musician[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Musicians').subscribe(result => {
            this.musicians = result.json() as Musician[];
        }, error => console.error(error));
    }
}

interface Musician {
    firstName: string; 
    lastName: string;
    
}
