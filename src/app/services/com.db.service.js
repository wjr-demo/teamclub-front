"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var _ = require("lodash");
var DBService = (function () {
    function DBService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this._emptyObservable = new rxjs_1.Subject();
        this._isReq = false; //是否以发送请求
        this.reqOpts = new http_1.RequestOptions({
            headers: this.headers
        });
    }
    DBService.prototype.save = function (url, model) {
        var _this = this;
        if (this._isReq) {
            return this._emptyObservable.asObservable();
        }
        this._isReq = true;
        var newD = model;
        return this.http.post(url, newD, this.reqOpts).map(function (res) {
            _this._isReq = false;
            var _res = res.json();
            if (_res && _res['status'] == 200) {
                return _res;
            }
        });
    };
    DBService.prototype.delete = function (url, id) {
        var _param;
        if (typeof id == 'number' || typeof id == 'string') {
            _param = { id: id };
        }
        else {
            _param = id;
        }
        return this.http.post(url, _param, this.reqOpts);
    };
    DBService.prototype.find = function (url, param) {
        if (param === void 0) { param = {}; }
        return this.http.post(url, param, this.reqOpts);
    };
    DBService.prototype.getFind = function (url, param) {
        if (param === void 0) { param = {}; }
        if (_.size(param) > 0) {
            url += url.indexOf('?') != -1 ? '&' + jQuery.param(param) : '?' + jQuery.param(param);
        }
        return this.http.get(url);
    };
    DBService.prototype.fileDownload = function (url, param) {
        if (param === void 0) { param = {}; }
        var options = new http_1.RequestOptions({ headers: this.headers, responseType: http_1.ResponseContentType.Blob });
        return this.http.post(url, param, options).catch(this.httpReqError).map(function (res) {
            var blob = res.blob();
            if (blob.type == 'application/json') {
                var reader = new FileReader();
                reader.readAsText(blob);
                return reader;
            }
            else {
                var contentDisposition = res.headers.get('content-disposition');
                var fileName = '';
                if (contentDisposition) {
                    fileName = contentDisposition.replace(/.*filename\=\"(.*)+\"/, '$1');
                    fileName = decodeURIComponent(fileName);
                }
                return { blob: res.blob(), fileName: fileName };
            }
        });
    };
    DBService.prototype.isEmpty = function (val) {
        return val == '' || val == undefined;
    };
    DBService.prototype.httpReqError = function (res) {
        var _res = res.json();
        console.log(_res);
        console.error('message:', _res['message'], '  error:', _res['error']);
        return rxjs_1.Observable.throw(_res['message']);
    };
    return DBService;
}());
DBService = __decorate([
    core_1.Injectable()
], DBService);
exports.DBService = DBService;
