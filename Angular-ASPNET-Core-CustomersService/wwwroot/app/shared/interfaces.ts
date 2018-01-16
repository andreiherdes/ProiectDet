import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
}

export interface IUser {
    id?: string;
    userName: string;
    password: string;
    email: string;
    displayName: string;
}

export interface ILoginModel {
    email: string;
    password: string;
}

export interface IPostModel {
    userId: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    gender: string;
    domain: string;
    description: string;
}

export interface IPost {
    id: number,
    userId: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    gender: string;
    domain: string;
    description: string;
    postDate: Date;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    status: boolean;
    customer: ICustomer;
}