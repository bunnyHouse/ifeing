var canvas = document.getElementById('lineGraph');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var startX = 30.5;
var endX = width - 15;
var startY = height - 24.5
var endY = 15;
var firstPointX = startX + 20;
var interval = (width - firstPointX - 30) / 11;
var lineColor = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7', '#05fffd', '#050db9', '#800800'];
var nodeRadius = 3;

var axisColor = 'rgba(0,0,0,.5)';

//画出坐标轴以及所有折线
function drawAllLine(sourceObj) {
    cleanCanvas();
    sourceObj = sourceObj || sourceData;
    var saleData = formatData(sourceObj);
    var maxSale = getMaxSale(saleData);
    drawXAxis();
    drawYAxis(maxSale);
    for (var i = 0; i < saleData.length; i++) {
        ctx.strokeStyle = lineColor[i];
        drawLine(saleData[i], maxSale);
    }
    for (var i = 0; i < saleData.length; i++) {
        ctx.fillStyle = lineColor[i];
        drawNode(saleData[i], maxSale);
    }
}

//画出X轴
function drawXAxis() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = axisColor;
    ctx.fillStyle = axisColor;
    ctx.textAlign = 'left';
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, startY);
    ctx.stroke();
    drawAngle(endX - 7, startY - 5, endX, startY, endX - 7, startY + 5)
    ctx.font = '16px serif';
    ctx.fillText('0', startX - 15, startY);
    for (var i = 1; i <= 12; i++) {
        ctx.fillText(i + '月', firstPointX + interval * (i - 1) - 10, startY + 20);
    }
}

//画出Y轴
function drawYAxis(maxSale) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = axisColor;
    ctx.fillStyle = axisColor;
    ctx.textAlign = 'right';
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, endY);
    ctx.stroke();
    drawAngle(startX - 5, endY + 7, startX, endY, startX + 5, endY + 7);
    for (var i = 1; i <= 5; i++) {
        ctx.fillText(maxSale / 5 * i, startX - 5, startY - (startY - endY) / 5 * i + 5)
    }
}

//画出一个箭头
function drawAngle(startX, startY, turnX, turnY, endX, endY) {
    ctx.lineWidth = 1;
    ctx.moveTo(startX, startY);
    ctx.lineTo(turnX, turnY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

//画一条折线图
function drawLine(data, maxValue) {
    var line = new Path2D();
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    for (var i = 0; i < data.length; i++) {
        var x = firstPointX + interval * i;
        var y = startY - data[i] / (maxValue / (startY - endY));
        if (i === 0) {
            line.moveTo(x, y);
        } else {
            line.lineTo(x, y);
        }
    }
    ctx.stroke(line);
}

//生成销售数据，返回一个二维数组
function formatData(source) {
    var data = [];
    for (var i = 0; i < source.length; i++) {
        var sale = source[i].sale;
        data.push(sale);
    }
    return data;
}

//获取最大销售值
function getMaxSale(data) {
    var max = 0;
    for (var i = 0; i < data.length; i++) {
        var saleArr = data[i];
        var m = saleArr[0];
        for (var j = 0; j < saleArr.length - 1; j++) {
            m = m < saleArr[j + 1] ? saleArr[j + 1] : m;
        }
        max = max > m ? max : m;
    }
    return max;
}

//画线间的节点
function drawNode(data, maxValue) {
    for (var i = 0; i < data.length; i++) {
        var circle = new Path2D();
        var x = firstPointX + interval * i;
        var y = startY - data[i] / (maxValue / (startY - endY));
        circle.moveTo(x, y);
        circle.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill(circle);
    }
}

//清空画布
function cleanCanvas() {
    ctx.clearRect(0, 0, width, height);
}