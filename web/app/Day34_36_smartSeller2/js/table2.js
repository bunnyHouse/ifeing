//获取选择的地区
function getSelectedRegions() {
    var regionEle = document.querySelectorAll('[name="regionSelect"][checkbox-type="item"]');
    var regions = [];
    for (var i = 0; i < regionEle.length; i++) {
        if (regionEle[i].checked) {
            regions.push(regionEle[i].value);
        }
    }
    return regions;
}

//获取选择的产品
function getSelectedProducts() {
    var productEle = document.querySelectorAll('[name="productSelect"][checkbox-type="item"]');
    var products = [];
    for (var i = 0; i < productEle.length; i++) {
        if (productEle[i].checked) {
            products.push(productEle[i].value);
        }
    }
    return products;
}

//获取数据
function getSelectedData() {
    var regions = getSelectedRegions();
    var products = getSelectedProducts();
    var data = filtData(sourceData, 'region', regions);
    data = filtData(data, 'product', products);
    return data;
}

//渲染表格
function initTable(dataArr) {
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var regions = getSelectedRegions();
    var products = getSelectedProducts();
    var regionFirst = regions.length === 1 && products.length > 1;
    //生成表头
    var htr = document.createElement('tr');
    for (var i = 0; i < 14; i++) {
        var td = document.createElement('td');
        if (i === 0) {
            td.innerHTML = regionFirst ? '地区' : '商品';
        } else if (i === 1) {
            td.innerHTML = regionFirst ? '商品' : '地区';
        } else {
            td.innerHTML = (i - 1) + '月';
        }
        htr.appendChild(td);
    }
    //生成表格主体
    dataArr = dataArr || sourceData;
    var regionObj = {};
    var productObj = {};
    for (var i = 0; i < dataArr.length; i++) {
        var item = dataArr[i];
        if (!regionObj[item.region]) {
            regionObj[item.region] = 1;
        } else {
            regionObj[item.region]++;
        }
        if (!productObj[item.product]) {
            productObj[item.product] = 1;
        } else {
            productObj[item.product]++;
        }
    }
    for (var i = 0; i < dataArr.length; i++) {
        var data = dataArr[i];
        var tr = document.createElement('tr');
        var firstTd = document.createElement('td');
        var firstField = regionFirst ? 'region' : 'product';
        var firstObj = regionFirst ? regionObj : productObj;
        if (firstObj[data[firstField]] > 0) {
            firstTd.rowSpan = firstObj[data[firstField]];
            firstTd.innerHTML = data[firstField];
            tr.appendChild(firstTd);
            firstObj[data[firstField]] = -1;
        }
        var secondTd = document.createElement('td');
        var secondField = regionFirst ? 'product' : 'region';
        secondTd.innerHTML = data[secondField];
        
        tr.appendChild(secondTd);
        var sale = data.sale;
        for (var j = 0; j < sale.length; j++) {
            var td = document.createElement('td');
            td.innerHTML = sale[j];
            tr.appendChild(td);
        }
        tr.setAttribute('class', 'dataRow');
        tr.setAttribute('product', data['product']);
        tr.setAttribute('region', data['region']);
        tbody.appendChild(tr);
    }
    
    tableWrapper.innerHTML = '';
    thead.appendChild(htr);
    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    showSingleInfo();
    showAllInfo();
}

//根据字段过滤数据
function filtData(source, field, valueArr) {
    var result = [];
    for (var i = 0; i < source.length; i++) {
        var data = source[i];
        if (valueArr.indexOf(data[field]) !== -1) {
            result.push(data);
        }
    }
    return result;
}

//鼠标悬浮事件，显示单条数据信息
function showSingleInfo() {
    var trs = document.querySelectorAll('.dataRow');
    for (var t = 0; t < trs.length; t++) {
        var tr = trs[t];
        tr.addEventListener('mouseenter', function(e) {
            var self = this;
            self.classList.add('onview');
            var region = self.getAttribute('region');
            var product = self.getAttribute('product');
            var saleObj = filtData(sourceData, 'region', region);
            saleObj = filtData(saleObj, 'product', product);
            drawAllLine(saleObj);
            drawAllBars(saleObj);
        });
        tr.addEventListener('mouseleave', function(e) {
            var self = this;
            self.classList.remove('onview');
        })
    }
}

//鼠标移出事件
function showAllInfo() {
    var tb = document.querySelector('table')
    tb.addEventListener('mouseleave', function() {
        var data = getSelectedData();
        drawAllLine(data);
        drawAllBars(data);
    })
}