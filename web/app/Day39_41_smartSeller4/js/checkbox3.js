var regionSelect = document.querySelector('#region-select');
var productSelect = document.querySelector('#product-select');
var tableWrapper = document.querySelector('#table-wrapper');

regionSelect.selectedRegions = [];
productSelect.selectedProducts = [];

function init() {
    var data = getSelectedData();
    initTable(data);
    drawAllLine(data);
    drawAllBars(data);
}

//绑定地区多选框切换事件
regionSelect.addEventListener('change', function () {
    init();
    setHistory();
})

//绑定产品多选框切换事件
productSelect.addEventListener('change', function () {
    init();
    setHistory();
})

function getHashArr(state) {
    if (state) {
        return state;
    } else {
        var regionsEle = document.querySelectorAll('input[name="regionSelect"][checkbox-type="item"]');
        var productsEle = document.querySelectorAll('input[name="productSelect"][checkbox-type="item"]');
        var regions = [];
        var products = [];
        for (var i = 0; i < regionsEle.length; i++) {
            regions.push(regionsEle[i].value);
        }
        for (var i = 0; i < productsEle.length; i++) {
            products.push(productsEle[i].value);
        }
        var hashArr = {regions: regions, products: products};
        return hashArr;
    }
}

function setHistory() {
    var regions = getSelectedRegions();
    var products = getSelectedProducts();
    var hashObj = {regions: regions, products: products};
    history.pushState(hashObj, null, location.href.split('#')[0] + '#' + encodeURI(JSON.stringify(hashObj)));
}

function reloadCheckbox(hashObj) {
    var selectedRegions = hashObj.regions;
    var selectedProducts = hashObj.products;
    var regions = document.querySelectorAll('input[name="regionSelect"][checkbox-type="item"]');
    var products = document.querySelectorAll('input[name="productSelect"][checkbox-type="item"]');
    var regionsAll = document.querySelector('input[name="regionSelect"][checkbox-type="all"]');
    var productsAll = document.querySelector('input[name="productSelect"][checkbox-type="all"]');
    for (var i = 0; i < regions.length; i++) {
        regions[i].checked = false;
        for (var j = 0; j < selectedRegions.length; j++) {
            if (regions[i].value === selectedRegions[j]) {
                regions[i].checked = true;
                preventLast(regions);
            }
        }
    }
    for (var i = 0; i < regions.length; i++) {
        products[i].checked = false;
        for (var j = 0; j < selectedProducts.length; j++) {
            if (products[i].value === selectedProducts[j]) {
                products[i].checked = true;
                preventLast(products);
            }
        }
    }
    
    regionsAll.checked = getCheckedItems(regions).length === regions.length;
    productsAll.checked = getCheckedItems(products).length === products.length;
}

//获取所有被选中的项
function getCheckedItems(checkItems) {
    var checkedItems = [];
    for (var i = 0; i < checkItems.length; i++) {
        if (checkItems[i].checked) {
            checkedItems.push(checkItems[i]);
        }
    }
    return checkedItems;
}

//至少保留一个选项被选择
function preventLast(checkItems) {
    var checkedItems = getCheckedItems(checkItems);
    if (checkedItems.length === 1)  {
        //todo 能否不用disabled而用其他方式替代
        checkedItems[0].disabled = 'disabled';
    } else {
        for (var i = 0; i < checkItems.length; i++) {
            checkItems[i].disabled = '';
        }
    }
}

//可用性验证
if (history.pushState) {
    //前进后退触发popstate事件
    window.addEventListener('popstate', function(e) {
        var hashArr = getHashArr(e.state);
        reloadCheckbox(hashArr);
        init();
    });
}

//分享或再次打开某个URL，需要从URL中读取到数据状态，并且进行页面呈现的还原
window.onload = function() {
    if (!location.hash) {
        return;
    }
    var hashArr = JSON.parse(decodeURI(location.hash.substr(1)));
    reloadCheckbox(hashArr);
    init();
}