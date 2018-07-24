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
    var source = JSON.parse(localStorage.sourceData);
    var regions = getSelectedRegions();
    var products = getSelectedProducts();
    var data = filtData(source, 'region', regions);
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
        var th = document.createElement('th');
        if (i === 0) {
            th.innerHTML = regionFirst ? '地区' : '商品';
        } else if (i === 1) {
            th.innerHTML = regionFirst ? '商品' : '地区';
        } else {
            th.innerHTML = (i - 1) + '月';
        }
        htr.appendChild(th);
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
            firstTd.classList.add(firstField + 'Td');
            tr.appendChild(firstTd);
            firstObj[data[firstField]] = -1;
        }
        var secondTd = document.createElement('td');
        var secondField = regionFirst ? 'product' : 'region';
        secondTd.innerHTML = data[secondField];
        secondTd.classList.add(secondField + 'Td');
        
        tr.appendChild(secondTd);
        var sale = data.sale;
        for (var j = 0; j < sale.length; j++) {
            var td = document.createElement('td');
            td.classList.add('salesTd');
            td.setAttribute('index', j);
            td.innerHTML = sale[j];
            //给td绑定点击事件开始编辑
            startEdit(td);
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
        tr.addEventListener('mouseenter', function (e) {
            var self = this;
            self.classList.add('onview');
            var region = self.getAttribute('region');
            var product = self.getAttribute('product');
            var source = JSON.parse(localStorage.sourceData);
            var saleObj = filtData(source, 'region', region);
            saleObj = filtData(saleObj, 'product', product);
            drawAllLine(saleObj);
            drawAllBars(saleObj);
        });
        tr.addEventListener('mouseleave', function (e) {
            var self = this;
            self.classList.remove('onview');
        })
    }
}

//鼠标移出事件
function showAllInfo() {
    var tb = document.querySelector('table')
    tb.addEventListener('mouseleave', function () {
        var data = getSelectedData();
        drawAllLine(data);
        drawAllBars(data);
    })
}

//鼠标点击单元格时触发编辑的事件
function startEdit(td) {
    td.addEventListener('click', function (e) {
        var self = this;
        var original = self.innerHTML;
        var sale = self.textContent;
        var onEdit = self.classList.contains('onEdit');
        //若点击的元素不是td本身则不触发
        if (e.target.tagName !== 'TD' && e.target.tagName !== 'I' || onEdit) {
            return false;
        }
        cancleEditWhenClickOther(self, original);
        //变为输入框
        var inputGroup = document.createElement('span');
        inputGroup.classList.add('input-group');
        var input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.classList.add('edit-cpnt');
        input.value = sale;
        self.innerHTML = '';
        
        //加入取消和修改按钮
        var confirmBtn = document.createElement('button');
        confirmBtn.classList.add('confirm-btn', 'edit-cpnt');
        var confirmIco = document.createElement('i');
        confirmIco.classList.add('asfont', 'icon-checkmarkround');
        confirmBtn.appendChild(confirmIco);
        var cancelBtn = document.createElement('button');
        cancelBtn.classList.add('cancel-btn', 'edit-cpnt');
        var cancelIco = document.createElement('i');
        cancelIco.classList.add('asfont', 'icon-cancel');
        cancelBtn.appendChild(cancelIco);
        inputGroup.appendChild(input);
        inputGroup.appendChild(confirmBtn);
        self.appendChild(inputGroup);
        self.appendChild(cancelBtn);
        input.focus();
        self.classList.add('onEdit');
        
        //绑定取消编辑事件
        cancelBtn.addEventListener('click', cancleEdit);    //取消按钮
        input.addEventListener('keyup', function (e) {       //esc键
            if (e.keyCode === 27) {
                cancleEdit(e);
            }
        });
        
        //绑定确认编辑事件
        confirmBtn.addEventListener('click', confirmEdit);      //确认按钮
        input.addEventListener('keyup', function(e) {           //回车键
            if (e.keyCode === 13) {
                confirmEdit(e);
            }
        });
        
        //取消编辑
        function cancleEdit(e) {
            self.innerHTML = original;
            self.classList.remove('onEdit');
            e.stopPropagation();
        }
        
        //确认编辑
        function confirmEdit(e) {
            var btn = this;
            if (e.type === 'keyup') {
                btn = e.target.nextSibling;
            }
            var td = btn.parentNode.parentNode;
            var tr = td.parentNode;
            var product = tr.getAttribute('product');
            var region = tr.getAttribute('region');
            var index = td.getAttribute('index');
            var newVal = +input.value;
            var d = JSON.parse(localStorage.sourceData);
            d.forEach(function(val, i) {
                if (val.product === product && val.region === region) {
                    val.sale[index] = newVal;
                }
            });
            localStorage.sourceData = JSON.stringify(d);
            self.innerHTML = newVal;
            self.classList.remove('onEdit');
            e.stopPropagation();
            initTable(d);
            drawAllLine(d);
            drawAllBars(d);
        }
    });
}

//点击页面其他地方取消编辑
function cancleEditWhenClickOther(self, original) {
    document.addEventListener('click', function (e) {
        var target = e.target;
        if (target !== self && !target.classList.contains('edit-cpnt')) {
            self.innerHTML = original;
            self.classList.remove('onEdit');
        }
    });
}
