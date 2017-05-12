import { Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpRequestService } from './http.request.service';
import * as _ from "lodash";

@Injectable()
export class DBService {
    private headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    private reqOpts;
    private _emptyObservable:Subject<any> = new Subject<any>();
    private _isReq:boolean = false; //是否以发送请求

    constructor(private http:HttpRequestService){
        this.reqOpts = new RequestOptions({
            headers:this.headers
        });
    }

    save<T>(url:string,model:T) {
        if (this._isReq){
            return this._emptyObservable.asObservable();
        }
        this._isReq = true;
        let newD = model;
        return this.http.post(url, newD,this.reqOpts).map(res=>{
            this._isReq = false;
            let _res = res.json();
            if (_res && _res['status'] == 200) {
                return _res;
            }
        });
    }

    delete(url:string,id:number | string | any){
        let _param ;
        if (typeof id == 'number' || typeof id == 'string') {
           _param = {id: id};
        }else {
            _param = id ;
        }
        return this.http.post(url,_param,this.reqOpts);
    }

    find(url:string,param:any={}){
        return this.http.post(url, param, this.reqOpts);
    }

    getFind(url:string,param:any={}){
        if(_.size(param) > 0){
            url += url.indexOf('?') != -1 ? '&'+jQuery.param(param) : '?'+jQuery.param(param);
        }
        return this.http.get(url);
    }


    fileDownload(url,param:any={}){
        let options = new RequestOptions({ headers: this.headers, responseType: ResponseContentType.Blob});
        return this.http.post(url,param,options).catch(this.httpReqError).map(res=>{
            let blob = res.blob();
            if(blob.type == 'application/json'){
                let reader = new FileReader();
                    reader.readAsText(blob);
                return reader;
            }else{
                let contentDisposition = res.headers.get('content-disposition');
                let fileName:string='';
                if(contentDisposition){
                    fileName = contentDisposition.replace(/.*filename\=\"(.*)+\"/,'$1');
                    fileName = decodeURIComponent(fileName);
                }
                return {blob:res.blob(),fileName:fileName};
            }
        });

    }

    private isEmpty(val){
        return val == '' || val == undefined;
    }

    private httpReqError(res:Response):Observable<any>{
        let _res = res.json();
        console.log(_res);
        console.error('message:',_res['message'],'  error:',_res['error']);
        return Observable.throw(_res['message']);
    }
}
