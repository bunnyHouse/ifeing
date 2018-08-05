var commonService = CommonService.getInstance();

/**
 * =================== 顾客类 ===================
 * @class Customer
 * @constructor
 */
function Customer() {

}

/**
 * 点菜方法
 * @function
 * @param {Object[]} dishes -菜品对象数组，菜品列表
 * @returns {Object[]} -菜品对象数组，菜品列表
 */
Customer.prototype.orderDishes = function () {
    var dishNum = 1;
    var dishes = [];
    var dishNames = [];
    var menu = menuFactory.getInstance();
    for (var i = 0; i < dishNum; i++) {
        var dish = menu[commonService.getRandowmNum(menu.length-1)];
        dishes.push(dish);
        dishNames.push(dish.name);
    }
    console.log('[customer] 我想吃：' + dishNames.join());
    waiterFactory.getInstance().takeOrder(dishes, this);
    return dishes;
}

/**
 * 吃菜方法
 * @function
 * @param {Object} dish -菜品对象
 */
Customer.prototype.eat = function (dish) {
    console.log('[customer] 我要开始吃' + dish.name + '了！');
}