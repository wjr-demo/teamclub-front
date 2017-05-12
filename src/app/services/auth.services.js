"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CURRENT_USER = 'currentUser';
var AuthService = (function () {
    function AuthService(dbService, router, _state) {
        this.dbService = dbService;
        this.router = router;
        this._state = _state;
    }
    AuthService.prototype.login = function (params) {
        return this.dbService.find("/app/login", params).map(function (res) {
            var _res = res.json();
            if (_res && _res['status'] == 200) {
                localStorage.setItem(CURRENT_USER, JSON.stringify(_res['data']));
            }
            return _res;
        });
    };
    AuthService.prototype.getCurUser = function () {
        var _curUserStr = localStorage.getItem(CURRENT_USER);
        if (_curUserStr) {
            return JSON.parse(_curUserStr);
        }
        return null;
    };
    // /**
    //  * 获取菜单信息
    //  * @returns {Observable<R>}
    //  */
    // loadMenuData():Observable<any>{
    //     let curUser:UserModel = JSON.parse(localStorage.getItem(CURRENT_USER));
    //     return this.dbService.find('/loginAuth/treeList',{appId:curUser.appId},SystemFuncTreeTransfer)
    //         .catch(this.httpReqError)
    //         .map((res)=>{
    //             let _res = _.clone(res.json()) ;
    //             if(_res && _res['status'] == 200){
    //                 let data = _res['data'];
    //                 this._state.menuData = data['trees'];
    //                 this._state.btnAuths = data['funcs'];
    //                 return _res;
    //             }
    //             return _res;
    //         });
    // }
    //
    // /**
    //  * 获取配置信息
    //  * @returns {Observable<R>}
    //  */
    // loadSysCfg():Observable<any>{
    //     return this.dbService.find('/sysConfig/finds',{},SysGlobalcfgTransfer).catch(this.httpReqError);
    // }
    //
    // /**
    //  * 加载领域信息
    //  * @param host
    //  * @returns {Observable<R>}
    //  */
    // loadDomainInfo(host:string){
    //     return this.dbService.find('',{mainHost:host}).catch(this.httpReqError);
    // }
    //
    // login(params:{}){
    //     return this.dbService.find('/loginAuth/login',params,systemUserInfoTransfer).map(res=>{
    //        let _res = res.json();
    //        if(_res && _res['status'] == 200){
    //            localStorage.setItem(CURRENT_USER,JSON.stringify(_res['data']));
    //        }
    //        return _res;
    //     });
    // }
    //
    // getCurUser(){
    //     let _curUserStr = localStorage.getItem(CURRENT_USER);
    //     if(_curUserStr){
    //         return JSON.parse(_curUserStr) as UserModel;
    //     }
    //     return  null;
    // }
    //
    // logout(){
    //     return this.dbService.find('/loginAuth/loginOut').map(res=>{
    //         let _res = res.json();
    //         if(_res && res['status'] == 200){
    //             let key:string;
    //             while((key = localStorage.key(0))){
    //                 localStorage.removeItem(key);
    //                 key = undefined;
    //             }
    //         }
    //         return _res;
    //     });
    // }
    AuthService.prototype.httpReqError = function (res) {
        var _res = res.json();
        console.error('message:', _res['message'], '  error:', _res['error']);
        return rxjs_1.Observable.throw(_res['message']);
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
