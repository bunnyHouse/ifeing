/*
* intro：一些通用方法的集合
* auth：bunnylover
* createDate：2018-7-28
* loc：Pudong library in Shanghai
* */
function commonService() {
    var commonService = {
        /*
         * intro: 从对象数组中根据某个字段值来查找对应对象在数组中的位置
         * params:
         *      value：目标值
         *      field：目标字段
         *      arr：目标数组
         * return：返回数组下标
         */
        getIndexOfArrByValue: function (value, field, arr) {
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
        }
    }
    return commonService;
}
