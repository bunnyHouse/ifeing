var cookFactory = (function(){
    var cook = null;
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
    Cook.prototype.completeWork = function (dishes, customer) {
        for (var i = 0; i < dishes.length; i++) {
            console.log('[cook] 烹饪出菜品：' + dishes[i].name);
            //通知服务员上菜
            waiterFactory.getInstance().serveCustomer(dishes[i], customer);
        }
    }
    
    return {
        getInstance: function(name, salary) {
            if (!cook) {
                cook = new Cook(name, salary);
            }
            return cook;
        }
    }
})();
