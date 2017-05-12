"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
require("style-loader!./login.scss");
var Login = (function () {
    function Login(fb, router, authService, sc) {
        this.router = router;
        this.authService = authService;
        this.sc = sc;
        this.submitted = false;
        this.form = fb.group({
            'userName': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'userPassword': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])]
        });
        this.userName = this.form.controls['userName'];
        this.userPassword = this.form.controls['userPassword'];
    }
    Login.prototype.onSubmit = function (values) {
        var _this = this;
        this.submitted = true;
        if (this.form.valid) {
            this.authService.login(values).subscribe(function (res) {
                if (res && res['status'] == 200) {
                }
                else {
                    _this.sc.alert(res['message']);
                }
            });
        }
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.html',
    })
], Login);
exports.Login = Login;
