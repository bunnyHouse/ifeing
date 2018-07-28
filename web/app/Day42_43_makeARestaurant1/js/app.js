var commonService = commonService();

/**
 * =================== 餐厅类 ====================
 * @class Restaurant
 * @constructor
 * @param {Object} 初始化餐厅
 * @property {Number} cash -餐厅资金
 * @property {Number} seats -餐厅座位数量
 * @property {Object[]} staff -餐厅职员列表
 */
function Restaurant(res) {
    this.cash = res.cash;
    this.seats = res.seats;
    this.staff = res.staff;
    var id = 1;
    Restaurant.getNewId = function () {
        return id++;
    }
}

/**
 * 聘用员工的方法
 * @function
 * @param {Object} staff -要雇佣的员工对象
 * @returns：{Object} -更新后的餐厅职工列表
 */
Restaurant.prototype.hire = function (staff) {
    this.staff.push(staff);
    return this.staff;
};

/**
 * 解雇员工的方法
 * @function
 * @param {Number} id -职工唯一编号
 * @returns：{Object} -返回被解雇的员工对象
 */
Restaurant.prototype.fire = function (id) {
    var index = commonService.getIndexOfArrByValue(id, 'id', this.staff);
    return this.staff.splice(index, 1);
};


/**
 * =================== 职员类 ===================
 * @class Staff
 * @constructor
 * @param {String} name -职员名字
 * @param {Number} salary -职员薪资
 * @property {Number} id -职员唯一标识id
 * @property {String} name -职员名字
 * @property {Number} salary -职员薪资
 */
function Staff(name, salary) {
    this.id = Restaurant.getNewId();
    this.name = name;
    this.salary = salary;
}

/**
 * 完成一次工作
 * @function
 */
Staff.prototype.completeWork = function () {
    console.log('完成了一次工作');
};


/**
 * =================== 服务员类 ===================
 * @class Waiter
 * @constructor
 * @extends Staff
 * @param {String} name -服务员姓名
 * @param {Number} salary -职员薪资
 */
function Waiter(name, salary) {
    Staff.apply(this, arguments);
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.sup = Staff.prototype;

/*
* 重写职员类中的完成一次工作方法
* */
Waiter.prototype.completeWork = function (args) {
    // 如果参数是数组，则判定为点餐
    if (Array.isArray(args)) {
        console.log('客户点了：' + args.join());
    } else {
        // 判定为上菜
        console.log('上菜：' + args);
    }
}


/**
 * =================== 厨师类 ===================
 * @class Cook
 * @constructor
 * @extends Staff
 * @param {String} name -厨师姓名
 * @param {Number} salary -职工薪资
 */
function Cook(name, salary) {
    Staff.apply(this, arguments);
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
Cook.sup = Cook.prototype;

/*
* 重写职员类中的完成一次工作方法
* */
Cook.prototype.completeWork = function (dish) {
    console.log('烹饪出菜品：' + dish);
}


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
Customer.prototype.orderDishes = function (dishes) {
    console.log('我想吃：' + dishes.join());
    return dishes;
}

/**
 * 吃菜方法
 * @function
 * @param {Object} dish -菜品对象
 */
Customer.prototype.eat = function (dish) {
    console.log('我要开始吃' + dish + '了！');
}


/**
 * =================== 菜品类 ===================
 * @class Dish
 * @constructor
 * @param {String} name -菜名
 * @param {Number} cost -成本
 * @param {Number} price -价格
 * @property {String} name -菜名
 * @property {Number} cost -成本
 * @property {Number} price -价格
 */
function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}
