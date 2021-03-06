"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("style-loader!./baMenuItem.scss");
var BaMenuItem = (function () {
    function BaMenuItem() {
        this.child = false;
        this.itemHover = new core_1.EventEmitter();
        this.toggleSubMenu = new core_1.EventEmitter();
    }
    BaMenuItem.prototype.onHoverItem = function ($event) {
        this.itemHover.emit($event);
    };
    BaMenuItem.prototype.onToggleSubMenu = function ($event, item) {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    };
    return BaMenuItem;
}());
__decorate([
    core_1.Input()
], BaMenuItem.prototype, "menuItem", void 0);
__decorate([
    core_1.Input()
], BaMenuItem.prototype, "child", void 0);
__decorate([
    core_1.Output()
], BaMenuItem.prototype, "itemHover", void 0);
__decorate([
    core_1.Output()
], BaMenuItem.prototype, "toggleSubMenu", void 0);
BaMenuItem = __decorate([
    core_1.Component({
        selector: 'ba-menu-item',
        templateUrl: './baMenuItem.html'
    })
], BaMenuItem);
exports.BaMenuItem = BaMenuItem;
