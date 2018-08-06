var waiterFactory = (function () {
    var waiter = null;
    
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
    Waiter.prototype.takeOrder = function (args, customer) {
        // 如果参数是数组，则判定为点餐
        var dishNames = [];
        for (var i = 0; i < args.length; i++) {
            dishNames.push(args[i].name);
        }
        console.log('[Waiter] 客户点了：' + dishNames.join());
        // 通知厨师客户点了什么菜
        cookFactory.getInstance().completeWork(args, customer);
    }
    
    /**
     * 上菜
     * @param {Object} dish -菜品
     */
    Waiter.prototype.serveCustomer = function (dish, customer) {
        // 上菜
        console.log('[Waiter] 上菜：' + dish.name);
        // 顾客可以开始用餐
        customer.eat(dish);
    }
    
    /**
     * 叫号
     */
    Waiter.prototype.callNumber = function () {
        var res = restaurantFactory.getInstance();
        if (res.queue.length === 0) {
            console.log('暂无客人排队');
            return;
        }
        var cusToEat = res.queue.shift();
        console.log('========== ' + cusToEat.name + '请就餐, 当前还有' + res.queue.length + '人等位中 ==========');
        res.seats--;
        cusToEat.orderDishes();
    }
    
    return {
        getInstance: function (name, salary) {
            if (!waiter) {
                waiter = new Waiter(name, salary);
            }
            return waiter;
        }
    }
})();
