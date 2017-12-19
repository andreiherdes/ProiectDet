import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IUser, IState, IPagedResults, ILoginModel, IPostModel, IPost } from '../shared/interfaces';

@Injectable()
export class DataService {

    //If you're on Angular 4.3 or higher you can use HttpClientModule. See data.service.ts.httpclient
  
    baseUrlCustomer: string = '/api/customers';
    baseStatesUrl: string = '/api/states';
    baseUrlUser: string = '/api/users';
    baseUrlLogin: string = '/api/login';
    baseUrlPost: string = '/api/posts';


    constructor(private http: Http, private router:Router) { 

    }
    
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get(this.baseUrlCustomer)
                   .map((res: Response) => {
                       let customers = res.json();
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   })
                   .catch(this.handleError);
    }

    getPosts(): Observable<IPost[]> {
        return this.http.get(this.baseUrlPost)
            .map((res: Response) => {
                let posts = res.json();
                return posts;
            })
            .catch(this.handleError);
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get(`${this.baseUrlCustomer}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let customers = res.json();
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get(this.baseUrlCustomer + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post(this.baseUrlCustomer, customer)
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }

    loginMethod(loginModel: ILoginModel): Observable<ILoginModel> {
        return this.http.post(this.baseUrlLogin, loginModel)
            .map((res: Response) => {
                const data = res.json();
                
                if (data.statusCode !== 403 && data.statusCode !== 404) {
                    localStorage.setItem('userId',data.id);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('displayName', data.displayName);
                    localStorage.setItem('userName',data.userName);
                    this.router.navigate(["dashboard"]);
                }
                return data.loginModel;
                
            })
            .catch(this.handleError);
    }

    insertUser(user: IUser): Observable<IUser> {
        return this.http.post(this.baseUrlUser, user)
            .map((resp: Response) => {
                const data = resp.json();
                console.log(data);
                return data.user;
            })
            .catch(this.handleError);
    }

    insertPost(post: IPostModel): Observable<IPostModel> {
        return this.http.post(this.baseUrlPost, post)
            .map((resp: Response) => {
                const data = resp.json();
                console.log(data);
                return data.post;
            })
            .catch(this.handleError);
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put(this.baseUrlCustomer + '/' + customer.id, customer) 
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete(this.baseUrlCustomer + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }

    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    getRequestOptions() {
        const csrfToken = ''; //would retrieve from cookie or from page
        const options = new RequestOptions({
            headers: new Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    }
    
    getStates(): Observable<IState[]> {
        return this.http.get(this.baseStatesUrl)
                   .map((res: Response) => res.json())
                   .catch(this.handleError);
    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }
    
    private handleError(error: any) {
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'ASP.NET Core server error');
    }

}
