var commonService = CommonService.getInstance();

/**
 * =================== 顾客类 ===================
 * @class Customer
 * @constructor
 */
function Customer(name) {
    this.name = name;
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
    console.log('[Customer] 让我想想吃什么...');
    var cus = this;
    setTimeout(function() {
        console.log('[Customer] 我想吃：' + dishNames.join());
        waiterFactory.getInstance().takeOrder(dishes, cus);
    }, 2000);
    // return dishes;
}

/**
 * 吃菜方法
 * @function
 * @param {Object} dish -菜品对象
 */
Customer.prototype.eat = function (dish) {
    console.log('[Customer] 我要开始吃' + dish.name + '了！');
    setTimeout(function() {
        console.log('[Customer] 我把' + dish.name + '吃完了！');
        res.seats++;
        waiterFactory.getInstance().callNumber();
    }, 1500);
}