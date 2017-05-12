"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BaPictureUploader = (function () {
    function BaPictureUploader(renderer) {
        this.renderer = renderer;
        this.defaultPicture = '';
        this.picture = '';
        this.uploaderOptions = { url: '' };
        this.canDelete = true;
        this.onUpload = new core_1.EventEmitter();
        this.onUploadCompleted = new core_1.EventEmitter();
    }
    BaPictureUploader.prototype.beforeUpload = function (uploadingFile) {
        var files = this._fileUpload.nativeElement.files;
        if (files.length) {
            var file = files[0];
            this._changePicture(file);
            if (!this._canUploadOnServer()) {
                uploadingFile.setAbort();
            }
            else {
                this.uploadInProgress = true;
            }
        }
    };
    BaPictureUploader.prototype.bringFileSelector = function () {
        this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    };
    BaPictureUploader.prototype.removePicture = function () {
        this.picture = '';
        return false;
    };
    BaPictureUploader.prototype._changePicture = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            _this.picture = event.target.result;
        }, false);
        reader.readAsDataURL(file);
    };
    BaPictureUploader.prototype._onUpload = function (data) {
        if (data['done'] || data['abort'] || data['error']) {
            this._onUploadCompleted(data);
        }
        else {
            this.onUpload.emit(data);
        }
    };
    BaPictureUploader.prototype._onUploadCompleted = function (data) {
        this.uploadInProgress = false;
        this.onUploadCompleted.emit(data);
    };
    BaPictureUploader.prototype._canUploadOnServer = function () {
        return !!this.uploaderOptions['url'];
    };
    return BaPictureUploader;
}());
__decorate([
    core_1.Input()
], BaPictureUploader.prototype, "defaultPicture", void 0);
__decorate([
    core_1.Input()
], BaPictureUploader.prototype, "picture", void 0);
__decorate([
    core_1.Input()
], BaPictureUploader.prototype, "uploaderOptions", void 0);
__decorate([
    core_1.Input()
], BaPictureUploader.prototype, "canDelete", void 0);
__decorate([
    core_1.Output()
], BaPictureUploader.prototype, "onUpload", void 0);
__decorate([
    core_1.Output()
], BaPictureUploader.prototype, "onUploadCompleted", void 0);
__decorate([
    core_1.ViewChild('fileUpload')
], BaPictureUploader.prototype, "_fileUpload", void 0);
BaPictureUploader = __decorate([
    core_1.Component({
        selector: 'ba-picture-uploader',
        styleUrls: ['./baPictureUploader.scss'],
        templateUrl: './baPictureUploader.html',
    })
], BaPictureUploader);
exports.BaPictureUploader = BaPictureUploader;
