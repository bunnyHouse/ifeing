var regionSelect = document.querySelector('#region-select');
var productSelect = document.querySelector('#product-select');

initRegionSelect();
initProductSelect();

initializeData();

initTable(JSON.parse(localStorage.sourceData));

//初始化地区选择
function initRegionSelect() {
    var regionsObj = {};
    var regionsArr = [];
    for (var i = 0; i < sourceData.length; i++) {
        var reg = sourceData[i];
        if (!regionsObj[reg.region]) {
            regionsObj[reg.region] = reg.region;
            regionsArr.push({
                value: reg.region,
                text: reg.region,
                checked: true
            });
        }
    }
    var options = {
        preventLast: true,
        disableUnCheckAll: true,
        name : 'regionSelect',
        title: '地区'
    };
    createCheckAllBoxs(regionSelect, regionsArr, options);
}

//初始化产品选择
function initProductSelect() {
    var productObj = {};
    var productArr = [];
    for (var i = 0; i < sourceData.length; i++) {
        var reg = sourceData[i];
        if (!productObj[reg.product]) {
            productObj[reg.product] = reg.product;
            productArr.push({
                value: reg.product,
                text: reg.product,
                checked: true
            });
        }
    }
    var options = {
        preventLast: true,
        disableUnCheckAll: true,
        name: 'productSelect',
        title: '商品'
    };
    createCheckAllBoxs(productSelect, productArr, options);
}

drawAllLine(JSON.parse(localStorage.sourceData));

drawAllBars(JSON.parse(localStorage.sourceData));
