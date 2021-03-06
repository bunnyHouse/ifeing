/**
 * 一些通用方法的集合
 * @author：bunnylover <756214593@qq.com>
 * @createDate：2018-7-28
 * @loc：Pudong library in Shanghai
 */
var CommonService = (function() {
    var common = null;
    function CommonServ() {
    
    }
    /**
     * 从对象数组中根据某个字段值来查找对应对象在数组中的位置
     * @function
     * @param {String|Number} value -目标值
     * @param {String} field -目标字段
     * @param {Array|Object[]} arr -目标数组
     * @returns：{Number} -返回找到的数组下标，如果没找到则返回-1
     */
    CommonServ.prototype.getIndexOfArrByValue = function (value, field, arr) {
        var argLength = arguments.length;
        // 没有参数或只有一个参数
        if (argLength === 0 || argLength === 1) {
            return false;
        }
        // 有两个参数：认为是value与arr，并且认为arr是一维数组
        if (argLength === 2) {
            return arr.indexOf(value);
        }
        // 有三个参数或以上参数：只接受前三个参数
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][field] === value) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * 获取一个随机数，若有一个参数则是产生【0，min】之间的随机数，若有两个参数，则是产生【min，max】之间的随机数
     * @param {Number} min -最小值
     * @param {Number} max -最大值
     * @returns {number} -返回目标区域内的一个随机整数
     */
    CommonServ.prototype.getRandowmNum = function (min, max) {
        switch (arguments.length) {
            case 1:
                return +Math.floor(Math.random() * (min + 1));
                break;
            case 2:
                return +Math.floor(Math.random() * (max - min + 1) + min);
                break;
            default:
                return 0;
                break;
        }
    }
    
    return {
        getInstance: function() {
            if (!common) {
                common = new CommonServ();
            }
            return common;
        }
        
    }
    
})();
