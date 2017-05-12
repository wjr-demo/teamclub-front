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
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var HttpRequestService = (function (_super) {
    __extends(HttpRequestService, _super);
    function HttpRequestService(_backend, _defaultOptions, snackBar, router) {
        var _this = _super.call(this, _backend, _defaultOptions) || this;
        _this.snackBar = snackBar;
        _this.router = router;
        return _this;
    }
    /**
     * Performs any type of http request.
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    HttpRequestService.prototype.request = function (url, options) {
        return _super.prototype.request.call(this, url, options);
    };
    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    HttpRequestService.prototype.get = function (url, options) {
        var _this = this;
        this.requestInterceptor();
        return _super.prototype.get.call(this, this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do(function (res) {
            _this.onSubscribeSuccess(res);
        }, function (error) {
            _this.onSubscribeError(error);
        })
            .finally(function () {
            _this.onFinally();
        });
    };
    HttpRequestService.prototype.getLocal = function (url, options) {
        return _super.prototype.get.call(this, url, options);
    };
    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    HttpRequestService.prototype.post = function (url, body, options) {
        var _this = this;
        this.requestInterceptor();
        return _super.prototype.post.call(this, this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do(function (res) {
            _this.onSubscribeSuccess(res);
        }, function (error) {
            _this.onSubscribeError(error);
        })
            .finally(function () {
            _this.onFinally();
        });
    };
    /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    HttpRequestService.prototype.put = function (url, body, options) {
        var _this = this;
        this.requestInterceptor();
        return _super.prototype.put.call(this, this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do(function (res) {
            _this.onSubscribeSuccess(res);
        }, function (error) {
            _this.onSubscribeError(error);
        })
            .finally(function () {
            _this.onFinally();
        });
    };
    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    HttpRequestService.prototype.delete = function (url, options) {
        var _this = this;
        this.requestInterceptor();
        return _super.prototype.delete.call(this, this.getFullUrl(url), options)
            .catch(this.onCatch)
            .do(function (res) {
            _this.onSubscribeSuccess(res);
        }, function (error) {
            _this.onSubscribeError(error);
        })
            .finally(function () {
            _this.onFinally();
        });
    };
    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    HttpRequestService.prototype.requestOptions = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        return options;
    };
    /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    HttpRequestService.prototype.getFullUrl = function (url) {
        // return full URL to API here
        return url;
    };
    /**
     * Request interceptor.
     */
    HttpRequestService.prototype.requestInterceptor = function () {
        // this.loaderService.showPreloader();
    };
    /**
     * Response interceptor.
     */
    HttpRequestService.prototype.responseInterceptor = function () {
        // this.loaderService.hidePreloader();
    };
    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    HttpRequestService.prototype.onCatch = function (error, caught) {
        return rxjs_1.Observable.throw(error);
    };
    /**
     * onSubscribeSuccess
     * @param res
     */
    HttpRequestService.prototype.onSubscribeSuccess = function (res) {
        var _res = res.json();
        if (_res.status) {
            var status_1 = _res.status;
            if (('' + status_1).startsWith('6')) {
                var m = status_1 == 600 ? '验证失败' : (status_1 == 601 ? '用户身份验证失败' : '用户未经授权');
                this.snackBar.open(m);
                var timeout = setTimeout((function () {
                    this.router.navigate(['/login']);
                }).bind(this), 2100);
            }
        }
    };
    /**
     * onSubscribeError
     * @param error
     */
    HttpRequestService.prototype.onSubscribeError = function (error) {
        var res = error.json();
        if (res.status) {
            var status_2 = res.status;
            if (status_2 == 405) {
                this.snackBar.open(res.message);
            }
            else if (status_2 == 504) {
                this.snackBar.open('请求超时,请刷新页面或重新登录.');
            }
        }
    };
    /**
     * onFinally
     */
    HttpRequestService.prototype.onFinally = function () {
        this.responseInterceptor();
    };
    return HttpRequestService;
}(http_1.Http));
HttpRequestService = __decorate([
    core_1.Injectable()
], HttpRequestService);
exports.HttpRequestService = HttpRequestService;
