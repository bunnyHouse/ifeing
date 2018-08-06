// 餐厅
var res = restaurantFactory.getInstance({
    cash: 10000,
    seats: 1,
    staff: []
});

// 厨师
var cook = cookFactory.getInstance('arnold', 1000);

// 服务员
var waiter = waiterFactory.getInstance('amor', 2000);

// 雇佣职员
res.hire(cook);
res.hire(waiter);

// 初始顾客队列
var cus0 = new Customer('超级无敌至尊VIP Amor');
var cus1 = new Customer('Tom');
var cus2 = new Customer('Jerry');
var cus3 = new Customer('Tony');
res.queue.push(cus0);
res.queue.push(cus1);
res.queue.push(cus2);
res.queue.push(cus3);

// 排队
var addCusButton = document.querySelector('#addCusBtn');
var newCusInput = document.querySelector('#newCustomer')
addCusButton.addEventListener('click', function() {
    addCusToQueue();
});
newCusInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        addCusToQueue();
    }
});
function addCusToQueue() {
    var newCusName = newCusInput.value;
    if (!newCusName || newCusName === '') {
        return;
    }
    var newCustomer = new Customer(newCusName);
    res.queue.push(newCustomer);
    if (res.queue.length > 0 && res.seats > 0) {
        waiter.callNumber();
        newCusInput.value = '';
        newCusInput.focus();
    }
}

// 开始叫号按钮
var callNumberBtn = document.querySelector('#callNumberBtn');
callNumberBtn.addEventListener('click', function() {
    waiter.callNumber();
})