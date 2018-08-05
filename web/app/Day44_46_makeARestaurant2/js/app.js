var res = restaurantFactory.getInstance({
    cash: 10000,
    seats: 1,
    staff: []
});

var cook = cookFactory.getInstance('arnold', 1000);

var waiter = waiterFactory.getInstance('amor', 2000);

res.hire(cook);
res.hire(waiter);

for (var i = 0; i < 10; i++) {
    console.log(i + ': ');
    var cus = new Customer();
    cus.orderDishes();
}

