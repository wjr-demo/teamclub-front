import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MenuModel } from '../models/menu.model';
import { Observable } from 'rxjs';
import { DBService } from './com.db.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpRequestService } from './http.request.service';
import { GlobalState } from '../global.state';
import { systemUserInfoTransfer } from '../transfer/systems/SystemUserInfo.transfer';
import { SystemFuncTreeTransfer } from '../transfer/systems/SystemFuncTree.transfer';
import { SysGlobalcfgTransfer } from '../transfer/systems/SysGlobalcfg.transfer';

const CURRENT_USER:string = 'currentUser';

@Injectable()
export class AuthService{

  constructor(private dbService:DBService,private router:Router,private _state:GlobalState){

  }

  login(params: {}) {
    return this.dbService.find("/app/login", params).map(res => {
      let _res = res.json();
      if(_res && _res['status'] == 200){
        localStorage.setItem(CURRENT_USER,JSON.stringify(_res['data']));
      }
      return _res;
    })
  }

  getCurUser(){
    let _curUserStr = localStorage.getItem(CURRENT_USER);
    if(_curUserStr){
      return JSON.parse(_curUserStr) as UserModel;
    }
    return  null;
  }

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


    private httpReqError(res:Response):Observable<any>{
        let _res = res.json();
        console.error('message:',_res['message'],'  error:',_res['error']);
        return Observable.throw(_res['message']);
    }

}
