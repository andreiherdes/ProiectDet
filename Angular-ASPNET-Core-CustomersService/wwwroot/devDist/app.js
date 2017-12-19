webpackJsonp([1],{

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var property_resolver_1 = __webpack_require__(166);
var DataFilterService = /** @class */ (function () {
    function DataFilterService() {
    }
    DataFilterService.prototype.filter = function (datasource, filterProperties, filterData) {
        if (datasource && filterProperties && filterData) {
            filterData = filterData.toUpperCase();
            var filtered = datasource.filter(function (item) {
                var match = false;
                for (var _i = 0, filterProperties_1 = filterProperties; _i < filterProperties_1.length; _i++) {
                    var prop = filterProperties_1[_i];
                    var propVal = '';
                    //Account for nested properties like 'state.name'
                    if (prop.indexOf('.') > -1) {
                        propVal = property_resolver_1.propertyResolver.resolve(prop, item);
                        if (propVal) {
                            propVal = propVal.toString().toUpperCase();
                        }
                    }
                    else {
                        if (item[prop]) {
                            propVal = item[prop].toString().toUpperCase();
                        }
                    }
                    if (propVal.indexOf(filterData) > -1) {
                        match = true;
                        break;
                    }
                }
                ;
                return match;
            });
            return filtered;
        }
        else {
            return datasource;
        }
    };
    DataFilterService = __decorate([
        core_1.Injectable()
    ], DataFilterService);
    return DataFilterService;
}());
exports.DataFilterService = DataFilterService;


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var propertyResolver = /** @class */ (function () {
    function propertyResolver() {
    }
    propertyResolver.resolve = function (path, obj) {
        return path.split('.').reduce(function (prev, curr) {
            return (prev ? prev[curr] : undefined);
        }, obj || self);
    };
    return propertyResolver;
}());
exports.propertyResolver = propertyResolver;


/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var property_resolver_1 = __webpack_require__(166);
var Sorter = /** @class */ (function () {
    function Sorter() {
        this.property = null;
        this.direction = 1;
    }
    Sorter.prototype.sort = function (collection, prop) {
        var _this = this;
        this.property = prop;
        this.direction = (this.property === prop) ? this.direction * -1 : 1;
        collection.sort(function (a, b) {
            var aVal;
            var bVal;
            //Handle resolving complex properties such as 'state.name' for prop value
            if (prop && prop.indexOf('.') > -1) {
                aVal = property_resolver_1.propertyResolver.resolve(prop, a);
                bVal = property_resolver_1.propertyResolver.resolve(prop, b);
            }
            else {
                aVal = a[prop];
                bVal = b[prop];
            }
            //Fix issues that spaces before/after string value can cause such as ' San Francisco'
            if (_this.isString(aVal))
                aVal = aVal.trim().toUpperCase();
            if (_this.isString(bVal))
                bVal = bVal.trim().toUpperCase();
            if (aVal === bVal) {
                return 0;
            }
            else if (aVal > bVal) {
                return _this.direction * -1;
            }
            else {
                return _this.direction * 1;
            }
        });
    };
    Sorter.prototype.isString = function (val) {
        return (val && (typeof val === 'string' || val instanceof String));
    };
    Sorter = __decorate([
        core_1.Injectable()
    ], Sorter);
    return Sorter;
}());
exports.Sorter = Sorter;


/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var TrackByService = /** @class */ (function () {
    function TrackByService() {
    }
    TrackByService.prototype.customer = function (index, customer) {
        return customer.id;
    };
    TrackByService = __decorate([
        core_1.Injectable()
    ], TrackByService);
    return TrackByService;
}());
exports.TrackByService = TrackByService;


/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(146);
var app_module_1 = __webpack_require__(239);
//enableProdMode(); //Uncomment for production
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .then(function (success) { return console.log('App bootstrapped'); })
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var platform_browser_1 = __webpack_require__(39);
var app_component_1 = __webpack_require__(240);
var app_routing_module_1 = __webpack_require__(241);
var core_module_1 = __webpack_require__(259);
var shared_module_1 = __webpack_require__(261);
var material_1 = __webpack_require__(175);
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                //BrowserAnimationsModule,
                material_1.MatButtonModule
            ],
            declarations: [app_component_1.AppComponent, app_routing_module_1.AppRoutingModule.components],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-component',
            template: "<router-outlet></router-outlet>"
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var router_1 = __webpack_require__(62);
var customers_component_1 = __webpack_require__(244);
var customers_grid_component_1 = __webpack_require__(247);
var customer_edit_component_1 = __webpack_require__(249);
var customer_edit_reactive_component_1 = __webpack_require__(251);
var user_register_component_1 = __webpack_require__(255);
var login_component_1 = __webpack_require__(257);
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'customers', component: customers_component_1.CustomersComponent },
    { path: 'customers/:id', component: customer_edit_component_1.CustomerEditComponent },
    { path: 'user-register', component: user_register_component_1.UserRegisterComponent },
    //{ path: 'customers/:id', component: CustomerEditReactiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.components = [customers_component_1.CustomersComponent, customers_grid_component_1.CustomersGridComponent, customer_edit_component_1.CustomerEditComponent, customer_edit_reactive_component_1.CustomerEditReactiveComponent, user_register_component_1.UserRegisterComponent, login_component_1.LoginComponent];
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var router_1 = __webpack_require__(62);
var data_filter_service_1 = __webpack_require__(165);
var data_service_1 = __webpack_require__(69);
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.customers = [];
        this.filteredCustomers = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    CustomersComponent.prototype.ngOnInit = function () {
        this.title = 'Customers';
        this.getCustomersPage(1);
    };
    CustomersComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.customers) {
            var props = ['firstName', 'lastName', 'address', 'city', 'state.name', 'orderTotal'];
            this.filteredCustomers = this.dataFilter.filter(this.customers, props, filterText);
        }
        else {
            this.filteredCustomers = this.customers;
        }
    };
    CustomersComponent.prototype.pageChanged = function (page) {
        this.getCustomersPage(page);
    };
    CustomersComponent.prototype.getCustomersPage = function (page) {
        var _this = this;
        this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.customers = _this.filteredCustomers = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getCustomersPage() retrieved customers'); });
    };
    CustomersComponent = __decorate([
        core_1.Component({
            selector: 'customers',
            template: __webpack_require__(246)
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            data_filter_service_1.DataFilterService])
    ], CustomersComponent);
    return CustomersComponent;
}());
exports.CustomersComponent = CustomersComponent;


/***/ }),

/***/ 246:
/***/ (function(module, exports) {

module.exports = "<div class=\"customers view indent\">\n    <div class=\"container\">\n        <header>\n            <h3>\n                <span class=\"glyphicon glyphicon-user\"></span>\n                Leleu Alexandru-Ioan\n            </h3>\n        </header>\n        <br />\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div class=\"navbar\">\n                    <filter-textbox (changed)=\"filterChanged($event)\"></filter-textbox>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <a class=\"btn btn-default\" [routerLink]=\"['/customers', '0']\">Add New Customer</a>\n                <a class=\"btn btn-default\" [routerLink]=\"['/user-register']\">User register</a>\n                <a class=\"btn btn-default\" [routerLink]=\"['/login']\">Login</a>\n            </div>\n        </div>\n    \n        <customers-grid [customers]=\"filteredCustomers\"></customers-grid>\n\n        <pagination [totalItems]=\"totalRecords\" \n            [pageSize]=\"pageSize\" \n            (pageChanged)=\"pageChanged($event)\"></pagination>\n          \n    </div>\n</div>\n"

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var sorter_1 = __webpack_require__(171);
var trackby_service_1 = __webpack_require__(172);
var CustomersGridComponent = /** @class */ (function () {
    function CustomersGridComponent(sorter, trackby) {
        this.sorter = sorter;
        this.trackby = trackby;
        this.customers = [];
    }
    CustomersGridComponent.prototype.ngOnInit = function () {
    };
    CustomersGridComponent.prototype.sort = function (prop) {
        this.sorter.sort(this.customers, prop);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CustomersGridComponent.prototype, "customers", void 0);
    CustomersGridComponent = __decorate([
        core_1.Component({
            selector: 'customers-grid',
            template: __webpack_require__(248),
            //When using OnPush detectors, then the framework will check an OnPush 
            //component when any of its input properties changes, when it fires 
            //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [sorter_1.Sorter, trackby_service_1.TrackByService])
    ], CustomersGridComponent);
    return CustomersGridComponent;
}());
exports.CustomersGridComponent = CustomersGridComponent;


/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row grid-container\">\n        <div class=\"col-md-10\">\n            <div class=\"table\">\n                <table class=\"table table-striped table-hover\">\n                    <thead>\n                        <tr>\n                            <th>&nbsp;</th>\n                            <th (click)=\"sort('firstName')\">First Name</th>\n                            <th (click)=\"sort('lastName')\">Last Name</th>\n                            <th (click)=\"sort('address')\">Address</th>\n                            <th (click)=\"sort('city')\">City</th>\n                            <th (click)=\"sort('state.name')\">State</th>\n                            <th (click)=\"sort('orderTotal')\">Order Total</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let customer of customers;trackBy:trackby.customer\">\n                            <td><img src=\"images/{{ customer.gender | lowercase }}.png\"\n                                    class=\"card-image\" alt=\"Customer Image\" /></td>\n                            <td><a [routerLink]=\"['/customers',customer.id]\">{{ customer.firstName | capitalize }}</a></td>\n                            <td>{{ customer.lastName | capitalize }}</td>\n                            <td>{{ customer.address }}</td>\n                            <td>{{ customer.city | trim }}</td>\n                            <td>{{ customer.state.name }}</td>\n                            <td>{{ customer.orderTotal | currency:'USD':true }}</td>\n                        </tr>\n                        <tr *ngIf=\"!customers.length\">\n                            <td>&nbsp;</td>\n                            <td colspan=\"6\">No Records Found</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var router_1 = __webpack_require__(62);
var data_service_1 = __webpack_require__(69);
var CustomerEditComponent = /** @class */ (function () {
    function CustomerEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.customer = {
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            email: '',
            city: '',
            zip: 0
        };
        this.user = {
            userName: '',
            password: '',
            email: '',
            displayName: '',
        };
        this.operationText = 'Insert';
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getCustomer(id);
        }
        this.getStates();
    };
    CustomerEditComponent.prototype.getCustomer = function (id) {
        var _this = this;
        this.dataService.getCustomer(id)
            .subscribe(function (customer) {
            _this.customer = customer;
        }, function (err) { return console.log(err); });
    };
    CustomerEditComponent.prototype.getStates = function () {
        var _this = this;
        this.dataService.getStates().subscribe(function (states) { return _this.states = states; });
    };
    CustomerEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.customer.id) {
            this.dataService.updateCustomer(this.customer)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/customers']);
                }
                else {
                    _this.errorMessage = 'Unable to save customer';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertUser(this.user)
                .subscribe(function (user) {
                if (user) {
                    _this.router.navigate(['/customer']);
                }
                else {
                    _this.errorMessage = 'Unable to add user';
                }
            }, function (err) { return console.log(err); });
        }
    };
    CustomerEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/']);
    };
    CustomerEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteCustomer(this.customer.id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/customers']);
            }
            else {
                _this.errorMessage = 'Unable to delete customer';
            }
        }, function (err) { return console.log(err); });
    };
    CustomerEditComponent = __decorate([
        core_1.Component({
            selector: 'customer-edit',
            template: __webpack_require__(250)
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService])
    ], CustomerEditComponent);
    return CustomerEditComponent;
}());
exports.CustomerEditComponent = CustomerEditComponent;


/***/ }),

/***/ 250:
/***/ (function(module, exports) {

module.exports = "<div>\n  <header>\n      <h3>\n          <span class=\"glyphicon glyphicon-user\"></span>\n          {{ customer.firstName }} {{ customer.lastName }}\n      </h3>\n  </header>\n  <br />\n  <form (ngSubmit)=\"submit()\" #customerForm=\"ngForm\" class=\"editForm\" novalidate>\n    <div class=\"form-group\">\n      <label>User Name</label>\n      <input type=\"text\" class=\"form-control\" name=\"userName\" [(ngModel)]=\"user.userName\" #userName=\"ngModel\" required>\n      <div class=\"alert alert-danger\" [hidden]=\"userName.untouched || userName.valid\">First Name is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Password</label>\n      <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\" #password=\"ngModel\" required>\n      <div class=\"alert alert-danger\" [hidden]=\"password.untouched || password.valid\">Password is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Email</label>\n      <input type=\"email\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\" #email=\"ngModel\" required pattern=\"^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$\" />\n      <div class=\"alert alert-danger\" [hidden]=\"email.untouched || email.valid\">Email is required and must be valid</div>\n    </div>\n      <div class=\"form-group\">\n          <label>Display Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"displayName\" [(ngModel)]=\"user.displayName\" #displayName=\"ngModel\" required>\n          <div class=\"alert alert-danger\" [hidden]=\"displayName.untouched || displayName.valid\">Display Name is required</div>\n      </div>\n\n\n    <div *ngIf=\"customer\">\n      <div class=\"alert alert-warning\" *ngIf=\"customer.id && deleteMessageEnabled\">\n         Delete Customer?&nbsp;&nbsp;<button class=\"btn btn-danger\" (click)=\"delete($event)\">Yes</button>&nbsp;&nbsp;\n         <button class=\"btn btn-default\" (click)=\"deleteMessageEnabled = false\">No</button>\n      </div>\n      <button class=\"btn btn-danger\" *ngIf=\"customer.id && !deleteMessageEnabled\" (click)=\"deleteMessageEnabled = true\">Delete</button>&nbsp;&nbsp;\n\n      <div class=\"pull-right\" *ngIf=\"!deleteMessageEnabled\">\n        <button class=\"btn btn-default\" (click)=\"cancel($event)\">Cancel</button>&nbsp;&nbsp;\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!customerForm.valid\">{{ operationText }}</button>\n      </div>\n    </div>\n    <br />\n    <br />\n    <div class=\"alert alert-danger\" *ngIf=\"errorMessage != null\">{{ errorMessage }}</div>\n\n  </form>\n</div>"

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var router_1 = __webpack_require__(62);
var forms_1 = __webpack_require__(25);
var data_service_1 = __webpack_require__(69);
var validation_service_1 = __webpack_require__(253);
var CustomerEditReactiveComponent = /** @class */ (function () {
    function CustomerEditReactiveComponent(router, route, dataService, formBuilder) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.customer = {
            id: '',
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            email: '',
            city: '',
            stateId: 0,
            zip: 0
        };
        this.operationText = 'Insert';
    }
    CustomerEditReactiveComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getCustomer(id);
        }
        this.getStates();
        this.buildForm();
    };
    CustomerEditReactiveComponent.prototype.getCustomer = function (id) {
        var _this = this;
        this.dataService.getCustomer(id)
            .subscribe(function (customer) {
            _this.customer = customer;
            _this.buildForm();
        }, function (err) { return console.log(err); });
    };
    CustomerEditReactiveComponent.prototype.buildForm = function () {
        this.customerForm = this.formBuilder.group({
            firstName: [this.customer.firstName, forms_1.Validators.required],
            lastName: [this.customer.lastName, forms_1.Validators.required],
            gender: [this.customer.gender, forms_1.Validators.required],
            email: [this.customer.email, [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            address: [this.customer.address, forms_1.Validators.required],
            city: [this.customer.city, forms_1.Validators.required],
            stateId: [this.customer.stateId, forms_1.Validators.required]
        });
    };
    CustomerEditReactiveComponent.prototype.getStates = function () {
        var _this = this;
        this.dataService.getStates().subscribe(function (states) { return _this.states = states; });
    };
    CustomerEditReactiveComponent.prototype.submit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value.id = this.customer.id;
        value.zip = this.customer.zip || 0;
        // var customer: ICustomer = {
        //   id: this.customer.id,
        // };
        if (value.id) {
            this.dataService.updateCustomer(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/customers']);
                }
                else {
                    _this.errorMessage = 'Unable to save customer';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertCustomer(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/customers']);
                }
                else {
                    _this.errorMessage = 'Unable to add customer';
                }
            }, function (err) { return console.log(err); });
        }
    };
    CustomerEditReactiveComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/customers']);
    };
    CustomerEditReactiveComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteCustomer(this.customer.id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/customers']);
            }
            else {
                _this.errorMessage = 'Unable to delete customer';
            }
        }, function (err) { return console.log(err); });
    };
    CustomerEditReactiveComponent = __decorate([
        core_1.Component({
            selector: 'customer-edit-reactive',
            template: __webpack_require__(254)
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService,
            forms_1.FormBuilder])
    ], CustomerEditReactiveComponent);
    return CustomerEditReactiveComponent;
}());
exports.CustomerEditReactiveComponent = CustomerEditReactiveComponent;


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValidationService = /** @class */ (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (code) {
        var config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
        };
        return config[code];
    };
    ValidationService.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
        }
    };
    ValidationService.emailValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationService.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;


/***/ }),

/***/ 254:
/***/ (function(module, exports) {

module.exports = "<div>\n  <header>\n      <h3>\n          <span class=\"glyphicon glyphicon-user\"></span>\n          {{ customer.firstName }} {{ customer.lastName }}\n      </h3>\n  </header>\n  <br />\n  <form [formGroup]=\"customerForm\" (ngSubmit)=\"submit(customerForm)\" class=\"editForm\" novalidate>\n    <div class=\"form-group\">\n      <label>First Name</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" />\n      <div class=\"alert alert-danger\" [hidden]=\"customerForm.controls.firstName.untouched || customerForm.controls.firstName.valid\">First Name is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Last Name</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"lastName\">\n      <div class=\"alert alert-danger\" [hidden]=\"customerForm.controls.lastName.untouched || customerForm.controls.lastName.valid\">Last Name is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Gender</label>\n      <br />\n      <div class=\"radio\">\n        <label>\n          <input type=\"radio\" name=\"gender\" formControlName=\"gender\" value=\"Male\" />\n          Male\n        </label>\n      </div>\n      <div class=\"radio\">\n        <label>\n          <input type=\"radio\" name=\"gender\" formControlName=\"gender\" value=\"Female\"  /> \n          Female\n        </label>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label>Email</label>\n      <input type=\"email\" class=\"form-control\" formControlName=\"email\" />\n      <div class=\"alert alert-danger\" [hidden]=\"customerForm.controls.email.untouched || customerForm.controls.email.valid\">Email is required and must be valid</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Address</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"address\" />\n      <div class=\"alert alert-danger\" [hidden]=\"customerForm.controls.address.untouched || customerForm.controls.address.valid\">Address is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>City</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"city\" />\n      <div class=\"alert alert-danger\" [hidden]=\"customerForm.controls.city.untouched || customerForm.controls.city.valid\">City is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>State</label>\n      <select class=\"form-control\" formControlName=\"stateId\">\n          <option *ngFor=\"let state of states\" [ngValue]=\"state.id\">{{state.name}}</option>\n      </select>\n    </div>\n    <br />\n\n    <div *ngIf=\"customer\">\n      <div class=\"alert alert-warning\" *ngIf=\"customer.id && deleteMessageEnabled\">\n         Delete Customer?&nbsp;&nbsp;<button class=\"btn btn-danger\" (click)=\"delete($event)\">Yes</button>&nbsp;&nbsp;\n         <button class=\"btn btn-default\" (click)=\"deleteMessageEnabled = false\">No</button>\n      </div>\n      <button class=\"btn btn-danger\" *ngIf=\"customer.id && !deleteMessageEnabled\" (click)=\"deleteMessageEnabled = true\">Delete</button>&nbsp;&nbsp;\n\n      <div class=\"pull-right\" *ngIf=\"!deleteMessageEnabled\">\n        <button class=\"btn btn-default\" (click)=\"cancel($event)\">Cancel</button>&nbsp;&nbsp;\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!customerForm.valid\">{{ operationText }}</button>\n      </div>\n    </div>\n    <br />\n    <br />\n    <div class=\"alert alert-danger\" *ngIf=\"errorMessage != null\">{{ errorMessage }}</div>\n\n  </form>\n</div>"

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var router_1 = __webpack_require__(62);
var data_service_1 = __webpack_require__(69);
var UserRegisterComponent = /** @class */ (function () {
    function UserRegisterComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.user = {
            userName: '',
            password: '',
            email: '',
            displayName: '',
        };
    }
    UserRegisterComponent.prototype.ngOnInit = function () {
    };
    UserRegisterComponent.prototype.submit = function () {
        var _this = this;
        this.dataService.insertUser(this.user)
            .subscribe(function (user) {
            if (user) {
                _this.router.navigate(['/customer']);
            }
            else {
                _this.errorMessage = 'Unable to add user';
            }
        }, function (err) { return console.log(err); });
    };
    UserRegisterComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/']);
    };
    UserRegisterComponent = __decorate([
        core_1.Component({
            selector: 'user-register',
            template: __webpack_require__(256)
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService])
    ], UserRegisterComponent);
    return UserRegisterComponent;
}());
exports.UserRegisterComponent = UserRegisterComponent;


/***/ }),

/***/ 256:
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <header>\r\n      <h1>Register:</h1>\r\n  </header>\r\n  <br />\r\n  <form (ngSubmit)=\"submit()\" #customerForm=\"ngForm\" class=\"editForm\" novalidate>\r\n    <div class=\"form-group\">\r\n      <label>User Name</label>\r\n      <input type=\"text\" class=\"form-control\" name=\"userName\" [(ngModel)]=\"user.userName\" #userName=\"ngModel\" required>\r\n      <div class=\"alert alert-danger\" [hidden]=\"userName.untouched || userName.valid\">First Name is required</div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Password</label>\r\n      <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\" #password=\"ngModel\" required>\r\n      <div class=\"alert alert-danger\" [hidden]=\"password.untouched || password.valid\">Password is required</div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Email</label>\r\n      <input type=\"email\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\" #email=\"ngModel\" required pattern=\"^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$\" />\r\n      <div class=\"alert alert-danger\" [hidden]=\"email.untouched || email.valid\">Email is required and must be valid</div>\r\n    </div>\r\n      <div class=\"form-group\">\r\n          <label>Display Name</label>\r\n          <input type=\"text\" class=\"form-control\" name=\"displayName\" [(ngModel)]=\"user.displayName\" #displayName=\"ngModel\" required>\r\n          <div class=\"alert alert-danger\" [hidden]=\"displayName.untouched || displayName.valid\">Display Name is required</div>\r\n      </div>\r\n\r\n    <br />\r\n    <br />\r\n    <div class=\"alert alert-danger\" *ngIf=\"errorMessage != null\">{{ errorMessage }}</div>\r\n      \r\n      <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!customerForm.valid\">Register</button>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var router_1 = __webpack_require__(62);
var data_service_1 = __webpack_require__(69);
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            template: __webpack_require__(258)
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ 258:
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n    <title>GeoS App</title>\r\n</head>\r\n<body>\r\n<div class=\"login-container\">\r\n    <div class=\"login-box\">\r\n        <div class=\"login-header\">\r\n            Log in first\r\n        </div>\r\n        <div class=\"login-content\">\r\n            <div class=\"input-group\">\r\n                <div class=\"input-field-name\">username</div>\r\n                <input class=\"input-field\">\r\n            </div>\r\n            <div class=\"input-group\">\r\n                <div class=\"input-field-name\">password</div>\r\n                <input type=\"password\" class=\"input-field\">\r\n            </div>\r\n            <a class=\"forgot-password-link\" href=\"#\">forgot password?</a>\r\n            <div class=\"button login-button\">\r\n                <a href=\"dashboard.html\">\r\n                    Log in\r\n                </a>\r\n            </div>\r\n            <div class=\"separator\"></div>\r\n            <div class=\"button register-button\">\r\n                <a href=\"dashboard.html\">\r\n                    Register now\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</body>\r\n</html>"

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var http_1 = __webpack_require__(118);
var http_2 = __webpack_require__(173);
var data_service_1 = __webpack_require__(69);
var data_filter_service_1 = __webpack_require__(165);
var sorter_1 = __webpack_require__(171);
var trackby_service_1 = __webpack_require__(172);
var ensureModuleLoadedOnceGuard_1 = __webpack_require__(260);
var CoreModule = /** @class */ (function (_super) {
    __extends(CoreModule, _super);
    //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    function CoreModule(parentModule) {
        return _super.call(this, parentModule) || this;
    }
    CoreModule = __decorate([
        core_1.NgModule({
            //If you're on Angular 4.3 or higher you can use HttpClientModule. See core.module.ts.httpclient
            imports: [http_1.HttpModule, http_2.HttpClientModule],
            providers: [
                //Default XSRF provider setup (change cookie or header name if needed): 
                //{ provide: XSRFStrategy, useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN') },
                data_service_1.DataService, data_filter_service_1.DataFilterService, sorter_1.Sorter, trackby_service_1.TrackByService
            ] // these should be singleton
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}(ensureModuleLoadedOnceGuard_1.EnsureModuleLoadedOnceGuard));
exports.CoreModule = CoreModule;
//Example of a custom XSRF class
//export class MyCookieXSRFStrategy implements XSRFStrategy {
//    constructor(
//        private _cookieName: string = 'XSRF-TOKEN', private _headerName: string = 'X-XSRF-TOKEN') { }
//    private getCookie(name: string) {
//        let ca: Array<string> = document.cookie.split(';');
//        let caLen: number = ca.length;
//        let cookieName = name + "=";
//        let c: string;
//        for (let i: number = 0; i < caLen; i += 1) {
//            c = ca[i].replace(/^\s\+/g, "");
//            if (c.indexOf(cookieName) == 0) {
//                return c.substring(cookieName.length, c.length);
//            }
//        }
//        return "";
//    }
//    configureRequest(req: Request) {
//        let xsrfToken = this.getCookie(this._cookieName);
//        alert(xsrfToken);
//        if (xsrfToken) {
//            req.headers.set(this._headerName, xsrfToken);
//        }
//    }
//}


/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EnsureModuleLoadedOnceGuard = /** @class */ (function () {
    function EnsureModuleLoadedOnceGuard(targetModule) {
        if (targetModule) {
            throw new Error(targetModule.constructor.name + " has already been loaded. Import this module in the AppModule only.");
        }
    }
    return EnsureModuleLoadedOnceGuard;
}());
exports.EnsureModuleLoadedOnceGuard = EnsureModuleLoadedOnceGuard;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var common_1 = __webpack_require__(8);
var forms_1 = __webpack_require__(25);
var pagination_component_1 = __webpack_require__(262);
var capitalize_pipe_1 = __webpack_require__(266);
var trim_pipe_1 = __webpack_require__(267);
var filter_textbox_component_1 = __webpack_require__(268);
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [capitalize_pipe_1.CapitalizePipe, trim_pipe_1.TrimPipe, filter_textbox_component_1.FilterTextboxComponent, pagination_component_1.PaginationComponent],
            exports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, capitalize_pipe_1.CapitalizePipe, trim_pipe_1.TrimPipe, filter_textbox_component_1.FilterTextboxComponent, pagination_component_1.PaginationComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.pages = [];
        this.currentPage = 1;
        this.isVisible = false;
        this.previousEnabled = false;
        this.nextEnabled = true;
        this.pageChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(PaginationComponent.prototype, "pageSize", {
        get: function () {
            return this.pagerPageSize;
        },
        set: function (size) {
            this.pagerPageSize = size;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        get: function () {
            return this.pagerTotalItems;
        },
        set: function (itemCount) {
            this.pagerTotalItems = itemCount;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngOnInit = function () {
    };
    PaginationComponent.prototype.update = function () {
        if (this.pagerTotalItems && this.pagerPageSize) {
            this.totalPages = Math.ceil(this.pagerTotalItems / this.pageSize);
            this.isVisible = true;
            if (this.totalItems >= this.pageSize) {
                for (var i = 1; i < this.totalPages + 1; i++) {
                    this.pages.push(i);
                }
            }
            return;
        }
        this.isVisible = false;
    };
    PaginationComponent.prototype.previousNext = function (direction, event) {
        var page = this.currentPage;
        if (direction == -1) {
            if (page > 1)
                page--;
        }
        else {
            if (page < this.totalPages)
                page++;
        }
        this.changePage(page, event);
    };
    PaginationComponent.prototype.changePage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (this.currentPage === page)
            return;
        this.currentPage = page;
        this.previousEnabled = this.currentPage > 1;
        this.nextEnabled = this.currentPage < this.totalPages;
        this.pageChanged.emit(page);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "pageSize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "totalItems", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "pageChanged", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'pagination',
            template: __webpack_require__(263),
            styles: [__webpack_require__(264)]
        }),
        __metadata("design:paramtypes", [])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;


/***/ }),

/***/ 263:
/***/ (function(module, exports) {

module.exports = "<nav [hidden]=\"!isVisible\">\n  <ul class=\"pagination\">\n    <li [class.disabled]=\"!previousEnabled\" (click)=\"previousNext(-1, $event)\">\n      <a aria-label=\"Previous\">\n        <span aria-hidden=\"true\">&laquo;</span>\n      </a>\n    </li>\n    <li *ngFor=\"let page of pages\" (click)=\"changePage(page, $event)\" [class.active]=\"currentPage === page\">\n      <a>{{ page }}</a>\n    </li>\n    <li [class.disabled]=\"!nextEnabled\" (click)=\"previousNext(1, $event)\">\n      <a aria-label=\"Next\">\n        <span aria-hidden=\"true\">&raquo;</span>\n      </a>\n    </li>\n  </ul>\n</nav>"

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(265);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(174)(undefined);
// imports


// module
exports.push([module.i, ".pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {\n  background-color: #027FF4;\n  border-color: #027FF4;\n}\n\n.pagination a {\n    cursor: pointer;\n}", ""]);

// exports


/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var CapitalizePipe = /** @class */ (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    };
    CapitalizePipe = __decorate([
        core_1.Pipe({ name: 'capitalize' })
    ], CapitalizePipe);
    return CapitalizePipe;
}());
exports.CapitalizePipe = CapitalizePipe;


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var TrimPipe = /** @class */ (function () {
    function TrimPipe() {
    }
    TrimPipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        return value.trim();
    };
    TrimPipe = __decorate([
        core_1.Pipe({ name: 'trim' })
    ], TrimPipe);
    return TrimPipe;
}());
exports.TrimPipe = TrimPipe;


/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var FilterTextboxComponent = /** @class */ (function () {
    function FilterTextboxComponent() {
        this.model = { filter: null };
        this.changed = new core_1.EventEmitter();
    }
    FilterTextboxComponent.prototype.filterChanged = function (event) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //Raise changed event
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FilterTextboxComponent.prototype, "changed", void 0);
    FilterTextboxComponent = __decorate([
        core_1.Component({
            selector: 'filter-textbox',
            template: "\n    <form>\n         Filter:\n         <input type=\"text\" name=\"filter\"\n                [(ngModel)]=\"model.filter\" \n                (keyup)=\"filterChanged($event)\"  />\n    </form>\n  "
        })
    ], FilterTextboxComponent);
    return FilterTextboxComponent;
}());
exports.FilterTextboxComponent = FilterTextboxComponent;


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var http_1 = __webpack_require__(118);
//Grab everything with import 'rxjs/Rx';
var Observable_1 = __webpack_require__(0);
__webpack_require__(167);
__webpack_require__(169);
__webpack_require__(170);
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        //If you're on Angular 4.3 or higher you can use HttpClientModule. See data.service.ts.httpclient
        this.baseUrlCustomer = '/api/customers';
        this.baseStatesUrl = '/api/states';
        this.baseUrlUser = '/api/users';
    }
    DataService.prototype.getCustomers = function () {
        var _this = this;
        return this.http.get(this.baseUrlCustomer)
            .map(function (res) {
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return customers;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCustomersPage = function (page, pageSize) {
        var _this = this;
        return this.http.get(this.baseUrlCustomer + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return {
                results: customers,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCustomer = function (id) {
        return this.http.get(this.baseUrlCustomer + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.insertCustomer = function (customer) {
        return this.http.post(this.baseUrlCustomer, customer)
            .map(function (res) {
            var data = res.json();
            console.log('insertCustomer status: ' + data.status);
            return data.customer;
        })
            .catch(this.handleError);
    };
    DataService.prototype.insertUser = function (user) {
        return this.http.post(this.baseUrlUser, user)
            .map(function (resp) {
            var data = resp.json();
            console.log(data);
            console.log('insertUser status: ' + data.status);
            return data.user;
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateCustomer = function (customer) {
        return this.http.put(this.baseUrlCustomer + '/' + customer.id, customer)
            .map(function (res) {
            var data = res.json();
            console.log('updateCustomer status: ' + data.status);
            return data.customer;
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteCustomer = function (id) {
        return this.http.delete(this.baseUrlCustomer + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    DataService.prototype.getRequestOptions = function () {
        var csrfToken = ''; //would retrieve from cookie or from page
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    };
    DataService.prototype.getStates = function () {
        return this.http.get(this.baseStatesUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.calculateCustomersOrderTotal = function (customers) {
        for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
            var customer = customers_1[_i];
            if (customer && customer.orders) {
                var total = 0;
                for (var _a = 0, _b = customer.orders; _a < _b.length; _a++) {
                    var order = _b[_a];
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable_1.Observable.throw(error || 'ASP.NET Core server error');
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;


/***/ })

},[235]);
//# sourceMappingURL=app.map