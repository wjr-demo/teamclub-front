import {MenuItemModel} from "./menu.item.model";
export class MenuModel{
    public path:string;
    public data:{menu:MenuItemModel};
    public children:Array<MenuModel>;
}