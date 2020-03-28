const menuList = [
    {
        "title": "首页",
        "key": "/home"
    },
    {
        "title": "商品",
        "key": "/product",
        "children": [
            {
                "title": "商品管理",
                "key": "/product/list",
            },
            {
                "title": "品类管理",
                "key": "/category/list",
            }
        ]
    },
    {
        "title": "订单",
        "key": "/order"
    },
    {
        "title": "用户管理",
        "key": "/user"
    }
];
export default menuList;