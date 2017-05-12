"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var pages_component_1 = require("./pages.component");
// noinspection TypeScriptValidateTypes
// export function loadChildren(path) { return System.import(path); };
exports.routes = [
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: 'app/pages/register/register.module#RegisterModule'
    },
    {
        path: 'pages',
        component: pages_component_1.Pages,
        children: [
            { path: 'new', loadChildren: 'app/pages/new/new.module#NewModule' }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(exports.routes);
