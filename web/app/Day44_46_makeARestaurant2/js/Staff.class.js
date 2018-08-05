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
    this.id = restaurantFactory.getNewId();
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