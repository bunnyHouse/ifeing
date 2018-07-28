var commonService = commonService();

/*
* =================== 餐厅类 ====================
* */
function Restaurant(res) {
    this.cash = res.cash;   //金钱
    this.seats = res.seats; //座位数量
    this.staff = res.staff; //职员列表
    var id = 1;
    Restaurant.getNewId = function() {
        return id++;
    }
}

/*
* intro：聘用员工
* arguments：
*       staff：要雇佣的员工对象
* return：无
* */
Restaurant.prototype.hire = function (staff) {
    this.staff.push(staff);
};

/*
* intro：解雇员工
* arguments：
*       id：员工id
* return：返回被解雇的员工对象
* */
Restaurant.prototype.fire = function (id) {
    var index = commonService.getIndexOfArrByValue(id, 'id', this.staff);
    return this.staff.splice(index, 1);
};


/*
* =================== 职员类 ===================
* */
function Staff(name, salary) {
    this.id = Restaurant.getNewId();    //id
    this.name = name;    //姓名
    this.salary = salary;    //工资
}

/*
* intro：完成一次工作
* arguments：
*       无
* return：无
* */
Staff.prototype.completeWork = function () {
    console.log('完成了一次工作');
};


/*
* =================== 服务员类 ===================
* */
function Waiter(name, salary) {
    Staff.apply(this, arguments);
}

/*
* 继承自职员类
* */
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.sup = Staff.prototype;

/*
* 重写职员类中的完成一次工作方法
* */
Waiter.prototype.completeWork = function(args) {
    // 如果参数是数组，则判定为点餐
    if (args instanceof(Array)) {
        console.log('客户点了：' + args.join());
    } else {
        // 判定为上菜
        console.log('上菜：' + args);
    }
}


/*
* =================== 厨师类 ===================
* */
function Cook(name, salary) {
    Staff.apply(this, arguments);
}

/*
* 继承自职员类
* */
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
Cook.sup = Cook.prototype;

/*
* 重写职员类中的完成一次工作方法
* */
Cook.prototype.completeWork = function (dish) {
    console.log('烹饪出菜品：' + dish);
}


/*
* =================== 顾客类 ===================
**/
function Customer() {

}
/*
* intro：点菜
* arguments：
*       dishes：数组类型，菜品列表
* return：菜品数组
* */
Customer.prototype.orderDishes = function (dishes) {
    console.log('我想吃：' + dishes.join());
    return dishes;
}

/*
* intro：吃菜
* arguments：
*       dish：菜品
* return：无
* */
Customer.prototype.eat = function (dish) {
    console.log('我要开始吃' + dish + '了！');
}


/*
* =================== 菜品类 ===================
* */
function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}
