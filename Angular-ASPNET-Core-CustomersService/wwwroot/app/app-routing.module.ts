import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';
import { UserRegisterComponent } from './users/user-register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:id', component: CustomerEditComponent },
  { path: 'user-register', component: UserRegisterComponent},
  { path: 'customers/:id', component: CustomerEditReactiveComponent },
  { path: '**', pathMatch:'full', redirectTo: '/login' } //catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [ CustomersComponent, CustomersGridComponent, CustomerEditComponent, CustomerEditReactiveComponent, UserRegisterComponent, LoginComponent, DashboardComponent ];
}