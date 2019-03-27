const menuList = [
    {
        title:'首页',
        key:'/home'
    },
   
    {
        title:'人才库列表',
        key:'/user/list'
    },
    {
        title:'标签管理',
        key:'/order',
        btnList:[
            {
                title:'订单详情',
                key:'detail'
            },
            {
                title:'结束订单',
                key:'finish'
            }
        ]
    },
    {
        title:'人才库分析',
        key:'/user/charts'
    },
    {
        title:'更新历史',
        key:'/bikeMap'
    },
    
    {
        title:'简历上传',
        key:'/user/upload'
    },
];
export default menuList;