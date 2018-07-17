var regionSelect = document.querySelector('#region-select');
var productSelect = document.querySelector('#product-select');
var tableWrapper = document.querySelector('#table-wrapper');

regionSelect.selectedRegions = [];
productSelect.selectedProducts = [];

//绑定地区多选框切换事件
regionSelect.addEventListener('change', function(){
    var data = getSelectedData();
    initTable(data);
    drawAllLine(data);
    drawAllBars(data);
})

//绑定产品多选框切换事件
productSelect.addEventListener('change', function() {
    var data = getSelectedData();
    initTable(data);
    drawAllLine(data);
    drawAllBars(data);
})
