export class MenuItemModel{
    public id:number; //编号
    public name:string;    //标题
    public appId:string;  //应用ID
    public subAppid:string;   //子应用编码
    public iframe:string;  //Iframe地址
    public code:string;    //编码
    public module;  //模块
    public authcode:string;    //授权检测编码
    public parent:number; //父级
    public ordered:number;    //排序
    public active:number; //是否激活（0：否 1：是）
    public permissionId:number;  //操作id
    public showTree:number;  //是否显示
    public iconClass:string;  //菜单图标样式
    public roleType:string;   //菜单角色分配,都个角色使用,号分割
    public extendField:string;    //扩充字段
}
