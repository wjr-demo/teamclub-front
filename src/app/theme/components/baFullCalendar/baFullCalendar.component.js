"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("fullcalendar/dist/fullcalendar.js");
require("style-loader!./baFullCalendar.scss");
var BaFullCalendar = (function () {
    function BaFullCalendar() {
        this.onCalendarReady = new core_1.EventEmitter();
    }
    BaFullCalendar.prototype.ngAfterViewInit = function () {
        var calendar = jQuery(this._selector.nativeElement).fullCalendar(this.baFullCalendarConfiguration);
        this.onCalendarReady.emit(calendar);
    };
    return BaFullCalendar;
}());
__decorate([
    core_1.Input()
], BaFullCalendar.prototype, "baFullCalendarConfiguration", void 0);
__decorate([
    core_1.Input()
], BaFullCalendar.prototype, "baFullCalendarClass", void 0);
__decorate([
    core_1.Output()
], BaFullCalendar.prototype, "onCalendarReady", void 0);
__decorate([
    core_1.ViewChild('baFullCalendar')
], BaFullCalendar.prototype, "_selector", void 0);
BaFullCalendar = __decorate([
    core_1.Component({
        selector: 'ba-full-calendar',
        templateUrl: './baFullCalendar.html',
    })
], BaFullCalendar);
exports.BaFullCalendar = BaFullCalendar;
