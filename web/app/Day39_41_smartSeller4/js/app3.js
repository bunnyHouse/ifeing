var regionSelect = document.querySelector('#region-select');
var productSelect = document.querySelector('#product-select');
var lineGraph = document.querySelector('#lineGraph');
var barGraph = document.querySelector('#barGraph');
var graphWrapper = document.querySelector('.graph-wrapper');

initRegionSelect();
initProductSelect();

initializeData();

initTable(JSON.parse(localStorage.sourceData));

drawAllLine(JSON.parse(localStorage.sourceData));

drawAllBars(JSON.parse(localStorage.sourceData));

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

//根据窗口大小动态调整canvas画布大小
window.addEventListener('resize', function(e) {
    var wrapperWidth = graphWrapper.offsetWidth;
    lineGraph.setAttribute('width', wrapperWidth * .447);
    lineGraph.setAttribute('height', this.innerHeight * .52);
    barGraph.setAttribute('width', wrapperWidth * .537);
    barGraph.setAttribute('height', this.innerHeight * .52);
    init();
});

//根据窗口大小动态调整canvas画布大小
window.addEventListener('load', function() {
    var wrapperWidth = graphWrapper.offsetWidth;
    lineGraph.setAttribute('width', wrapperWidth * .447);
    lineGraph.setAttribute('height', this.innerHeight * .52);
    barGraph.setAttribute('width', wrapperWidth * .537);
    barGraph.setAttribute('height', this.innerHeight * .52);
    init();
});