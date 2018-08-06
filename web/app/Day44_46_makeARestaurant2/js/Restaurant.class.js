var commonService = CommonService.getInstance();
var restaurantFactory = (function(commonService) {
    var restaurant = null;
    /**
     * =================== 餐厅类 ====================
     * @class Restaurant
     * @constructor
     * @param {Object} 初始化餐厅
     * @property {Number} cash -餐厅资金
     * @property {Number} seats -餐厅座位数量
     * @property {Object[]} staff -餐厅职员列表
     * @property {Object[]} queue -餐厅等位列表，元素为Customer对象
     */
    function Restaurant(res) {
        this.cash = res.cash;
        this.seats = 1;
        this.staff = res.staff;
        this.id = 1;
        this.queue = [];
    }
    /**
     * 聘用员工的方法
     * @function
     * @param {Object} staff -要雇佣的员工对象
     * @returns：{Object} -更新后的餐厅职工列表
     */
    Restaurant.prototype.hire = function (staff) {
        if (this.cash - staff.salary < 0) {
            console.log('Our restaurant can\'t afford this staff for now, our cash: ' + this.cash);
            return;
        }
        this.staff.push(staff);
        this.cash -= staff.salary;
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
    
    Restaurant.prototype.queuing = function (customer) {
        this.queue.push(customer);
        console.log('[Customer] ' + customer.name + '开始等位');
        console.log('[Restaurant] 当前有' + this.queue.length + '人在等位');
    }
    
    return {
        getInstance: function(res) {
            if(!restaurant) {
                restaurant = new Restaurant(res);
            }
            return restaurant;
        },
        getNewId: function() {
            return restaurant.id++;
        }
    }
})(commonService);