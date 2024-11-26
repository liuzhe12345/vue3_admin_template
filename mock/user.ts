//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home', 'car'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: { checkUser } }
        },
    },
    {
        url: '/api/admin/acl/index/info',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: "成功",
                data: {
                    routes: [  
                        "User",
                        "Category",
                        "Discount",
                        "ActivityEdit",
                        "CouponRule",
                        "Point",
                        "Grade",
                        "Product",
                        "Activity",
                        "CouponAdd",
                        "Trademark",
                        "Attr",
                        "ActivityAdd",
                        "ASD",
                        "CouponEdit",
                        "OrderShow",
                        "Permission",
                        "Spu",
                        "UserList",
                        "ClientUser",
                        "Order",
                        "Coupon",
                        "permision",
                        "Acl",
                        "ActivityRule",
                        "Role",
                        "RoleAuth",
                        "Refund",
                        "buynow",
                        "Car",
                        "x",
                        "OrderList",
                        "Sku",
                        "map.beijing",
                        "Map",
                        "Base",
                        "Fence",
                        "Position",
                        "Path",
                        "Teach",
                        "Dormitory"
                    ],
                    buttons: [
                        "cuser.detail",
                        "cuser.update",
                        "cuser.delete",
                        "btn.User.add",
                        "btn.User.remove",
                        "btn.User.update",
                        "btn.User.assgin",
                        "btn.Role.assgin",
                        "btn.Role.add",
                        "btn.Role.update",
                        "btn.Role.remove",
                        "btn.Permission.add",
                        "btn.Permission.update",
                        "btn.Permission.remove",
                        "btn.Activity.add",
                        "btn.Activity.update",
                        "btn.Activity.rule",
                        "btn.Coupon.add",
                        "btn.Coupon.update",
                        "btn.Coupon.rule",
                        "btn.OrderList.detail",
                        "btn.OrderList.Refund",
                        "btn.UserList.lock",
                        "btn.Category.add",
                        "btn.Category.update",
                        "btn.Category.remove",
                        "btn.Trademark.add",
                        "btn.Trademark.update",
                        "btn.Trademark.remove",
                        "btn.Attr.add",
                        "btn.Attr.update",
                        "btn.Attr.remove",
                        "btn.Spu.add",
                        "btn.Spu.addsku",
                        "btn.Spu.update",
                        "btn.Spu.skus",
                        "btn.Spu.delete",
                        "btn.Sku.updown",
                        "btn.Sku.update",
                        "btn.Sku.detail",
                        "btn.Sku.remove",
                        "btn.all",
                        "btn.test.2",
                        "aaabbb",
                        "",
                        "22223333444",
                        "User",
                        "btn.Trademark.search",
                        "map.beijing.get"
                    ],
                    roles: [
                        "超级管理员"
                    ],
                    name: "admin",
                    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
                },
                ok: true
            }
        }
    },

    //设备管理
    {
        url: '/api/admin/acl/role/1/10/',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: "成功",
                data: {
            "records": [
                {
                    "id": 15163,
                    "createTime": "2024-08-01 10:46:50",
                    "updateTime": "2024-08-01 10:46:50",
                    "roleName": "学生",
                    "username":"雷小伟",
                    "studentnumber":2227211188,
                    "classnumber":2227201,
                    "remark": null
                },
                {
                    "id": 15143,
                    "createTime": "2024-07-30 15:24:59",
                    "updateTime": "2024-07-30 15:24:59",
                    "roleName": "教师",
                    "username":"王老师",
                    "studentnumber":11111111,
                    "remark": null
                },
                {
                    "id": 152249,
                    "createTime": "2021-06-01 08:46:22",
                    "updateTime": "2023-04-30 15:54:45",
                    "username": "王**",
                    "password": "96e79218965eb72c92a549dd5a330112",
                    "name": "王**",
                    "phone": null,
                    "roleName": "学生",
                    "studentnumber":2227211178,
                    "classnumber":2227202,
                },
            ],
            "total": 12,
            "size": 10,
            "current": 1,
            "orders": [],
            "optimizeCountSql": true,
            "hitCount": false,
            "countId": null,
            "maxLimit": null,
            "searchCount": true,
            "pages": 2
         },
             "ok": true
         }
     }
    },
    //用户设备管理http://localhost:5173
    {
        url: '/api/admin/acl/user/toAssign/1',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: "成功",
                data: {
                    "assignRoles": [
            {
                "id": 1,
                "createTime": "2021-05-31 18:09:18",
                "updateTime": "2023-04-28 11:03:38",
                "roleName": "超级管理员",
                "remark": null
            },
            {
                "id": 15153,
                "createTime": "2024-07-31 14:41:02",
                "updateTime": "2024-07-31 14:41:02",
                "roleName": "学生",
                "remark": null
            },
            {
                "id": 15157,
                "createTime": "2024-07-31 14:41:02",
                "updateTime": "2024-07-31 14:41:02",
                "roleName": "教师",
                "remark": null
            }
        ],
        "allRolesList": [
            {
                "id": 1,
                "createTime": "2021-05-31 18:09:18",
                "updateTime": "2023-04-28 11:03:38",
                "roleName": "超级管理员",
                "remark": null
            },
            {
                "id": 15153,
                "createTime": "2024-07-31 14:41:02",
                "updateTime": "2024-07-31 14:41:02",
                "roleName": "学生",
                "remark": null
            },
            {
                "id": 15157,
                "createTime": "2024-07-31 14:41:02",
                "updateTime": "2024-07-31 14:41:02",
                "roleName": "教师",
                "remark": null
            }      
        ],
        "ok": true     
        } 
        }
    }
    },
    //用户账号管理
    {
        url: '/api/admin/acl/user/1/11/',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: "成功",
                data: {
            "records": [
            {
                "id": 111111,
                "createTime": "2021-06-01 08:46:22",
                "updateTime": "2023-04-30 15:54:45",
                "username": "shangguigu",
                "password": "96e79218965eb72c92a549dd5a330112",
                "name": "shangguigu",
                "phone": null,
                "roleName": "超级管理员"
            },
            {
                "id": 245987,
                "createTime": "2021-06-01 08:46:22",
                "updateTime": "2023-04-30 15:54:45",
                "username": "雷小伟",
                "password": "96e79218965eb72c92a549dd5a330112",
                "name": "雷小伟",
                "phone": null,
                "roleName": "学生",
                "studentnumber":2227211188,
                "classnumber":2227201,
            },
            {
                "id": 152249,
                "createTime": "2021-06-01 08:46:22",
                "updateTime": "2023-04-30 15:54:45",
                "username": "王**",
                "password": "96e79218965eb72c92a549dd5a330112",
                "name": "王**",
                "phone": null,
                "roleName": "学生",
                "studentnumber":2227211178,
                "classnumber":2227202,
            },
        ],
                "total": 6,
                "size": 5,
                "current": 1,
                "orders": [],
                "optimizeCountSql": true,
                "hitCount": false,
                "countId": null,
                "maxLimit": null,
                "searchCount": true,
                "pages": 2
            },
            "ok": true
                 }
               }
        },
        //宿舍管理
    {
        url: '/api//admin/acl/dormitory/',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: "成功",
                data: {
            "records": [
            {
                "id": 111111,
                "createTime": "2021-06-01 08:46:22",
                "updateTime": "2023-04-30 15:54:45",
                "username": "shangguigu",
                "password": "96e79218965eb72c92a549dd5a330112",
                "name": "shangguigu",
                "phone": null,
                "roleName": "超级管理员"
            },
            {
                "id": 245987,
                "createTime": "2021-06-01 08:46:22",
                "updateTime": "2023-04-30 15:54:45",
                "username": "雷小伟",
                "password": "96e79218965eb72c92a549dd5a330112",
                "name": "雷小伟",
                "phone": null,
                "roleName": "学生",
                "studentnumber":2227211188,
                "classnumber":2227201,
            },
            {
                "id": 152249,
                "createTime": "2021-06-01 08:46:22",
                "updateTime": "2023-04-30 15:54:45",
                "username": "王**",
                "password": "96e79218965eb72c92a549dd5a330112",
                "name": "王**",
                "phone": null,
                "roleName": "学生",
                "studentnumber":2227211178,
                "classnumber":2227202,
            },
        ],
                "total": 6,
                "size": 5,
                "current": 1,
                "orders": [],
                "optimizeCountSql": true,
                "hitCount": false,
                "countId": null,
                "maxLimit": null,
                "searchCount": true,
                "pages": 2
            },
            "ok": true
                 }
               }
        },

]