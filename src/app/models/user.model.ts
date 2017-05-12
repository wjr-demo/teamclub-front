export class UserModel{
    public id:number; //编号
    public username:string;    //用户名、唯一
    public appId:string;    //应用ID
    public roleType:number;    //用户的角色类型，附加字段，子业务系统识别
    public organId:number;    //
    public organNo:string;    //组织机构编号
    public realname:string;    //真实姓名
    public deptname:string;    //归属部门
    public deptid:number;    //部门ID,关联: pay_mch_depart
    public deptno:string;    //部门编号,说明性字段
    public isDeptAdmin:number;    //是否为部门管理员
    public phone:string;    //联系电话
}
