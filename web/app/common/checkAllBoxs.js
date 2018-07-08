/*
* 带全选功能的多选组件
* @params：
*   wrapper：组件容器，一个js对象
*   data：选项的参数，一个对象数组
*       [{
*           value: 'value',
*           text: 'text'
*       }, {}]
* */
function createCheckAllBoxs(wrapper, data, options) {
    //画出全选钮
    var checkAllSpan = document.createElement('label');
    var checkAll = document.createElement('input');
    checkAll.setAttribute('type', 'checkbox');
    checkAll.setAttribute('checkbox-type', 'all');
    if (options.name) {
        checkAll.setAttribute('name', options.name);
    }
    var text = document.createTextNode('全选');
    checkAllSpan.appendChild(checkAll);
    checkAllSpan.appendChild(text);
    wrapper.appendChild(checkAllSpan);
    
    //画出单选钮
    var checkItems = [];    //所有单选框
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var checkItemSpan = document.createElement('label');
        var checkItem = document.createElement('input');
        checkItem.setAttribute('type', 'checkbox');
        checkItem.setAttribute('checkbox-type', 'item');
        if (options.name) {
            checkItem.setAttribute('name', options.name);
        }
        checkItem.value = item.value;
        var text = document.createTextNode(item.text);
        checkItemSpan.appendChild(checkItem);
        checkItemSpan.appendChild(text);
        wrapper.appendChild(checkItemSpan);
        checkItems.push(checkItem);
    }
    
    //点击全选框时的效果
    checkAll.addEventListener('change', function(e) {
        if (options.disableUnCheckAll && !this.checked) {
            this.checked = !this.checked;
        }
        for (var i = 0; i < checkItems.length; i++) {
            checkItems[i].checked = this.checked;
        }
        if (this.checked) {
            for (var i = 0; i < checkItems.length; i++) {
                checkItems[i].disabled = '';
            }
        }
    })
    
    //获取所有被选中的项
    function getCheckedItems() {
        var checkedItems = [];
        for (var i = 0; i < checkItems.length; i++) {
            if (checkItems[i].checked) {
                checkedItems.push(checkItems[i]);
            }
        }
        return checkedItems;
    }
    
    //================高级配置项=================
    if (!options) {
        return;
    }
    
    //至少保留一个选项被选择
    function preventLast() {
        var checkedItems = getCheckedItems();
        if (options.preventLast && checkedItems.length === 1)  {
            //todo 能否不用disabled而用其他方式替代
            checkedItems[0].disabled = 'disabled';
        } else {
            for (var i = 0; i < checkItems.length; i++) {
                checkItems[i].disabled = '';
            }
        }
    }
    
    //给每个单选项绑定事件
    for (var i = 0; i < checkItems.length; i++) {
        var item = checkItems[i];
        item.addEventListener('change', function() {
            preventLast();
            //对全选框的影响
            var checkedItems = getCheckedItems();
            checkAll.checked = checkedItems.length === checkItems.length;
        })
    }
}