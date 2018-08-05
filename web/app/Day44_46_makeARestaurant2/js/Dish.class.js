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