var barCanvas = document.getElementById('barGraph');
var barCtx = barCanvas.getContext('2d');
var barCanvasWidth = barCanvas.width;
var barCanvasHeight = barCanvas.height;
var barStartX = 30.5;
var barEndX = barCanvasWidth - 15;
var barStartY = barCanvasHeight - 24.5
var barEndY = 15;
var barInterval = 10;
var barWidth = 60;

var barColor = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7', '#05fffd', '#050db9', '#800800'];
var barAxisColor = 'rgba(0,0,0,.5)';

drawAllBars();

//画出所有产品的柱状图
function drawAllBars(sourceObj) {
    cleanBarCanvas();
    sourceObj = sourceObj || sourceData;
    var data = formatBarData(sourceObj);
    var maxBarSale = getMaxBarSale(data);
    drawBarXAxis();
    drawBarYAxis(maxBarSale);
    var saleData = formatBarData(sourceObj);
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < saleData.length; j++) {
            var sale = saleData[j][i];
            var value = (startY - endY) / maxBarSale * sale;
            barCtx.fillStyle = barColor[j];
            barCtx.fillRect(barStartX + barInterval * (i + 1) + barWidth * i + (barWidth / saleData.length) * j, startY - value, barWidth / saleData.length, value);
        }
    }
}

//画出X轴
function drawBarXAxis() {
    barCtx.lineWidth = 1;
    barCtx.strokeStyle = barAxisColor;
    barCtx.fillStyle = barAxisColor;
    barCtx.textAlign = 'left';
    barCtx.moveTo(barStartX, barStartY);
    barCtx.lineTo(barEndX, barStartY);
    barCtx.stroke();
    drawBarAngle(barEndX - 7, barStartY - 5, barEndX, barStartY, barEndX - 7, barStartY + 5)
    barCtx.font = '16px serif';
    barCtx.fillText('0', barStartX - 15, barStartY);
    for (var i = 0; i < 12; i++) {
        barCtx.fillText((i+1) + '月', barStartX + barInterval * (i + 1) + barWidth * i + 20, barStartY + 20);
    }
}

//画出Y轴
function drawBarYAxis(maxBarSale) {
    barCtx.lineWidth = 1;
    barCtx.strokeStyle = barAxisColor;
    barCtx.fillStyle = barAxisColor;
    barCtx.textAlign = 'right';
    barCtx.moveTo(barStartX, barStartY);
    barCtx.lineTo(barStartX, barEndY);
    barCtx.stroke();
    drawBarAngle(barStartX - 5, barEndY + 7, barStartX, barEndY, barStartX + 5, barEndY + 7);
    for (var i = 1; i <= 5; i++) {
        barCtx.fillText(maxBarSale / 5 * i, barStartX - 5, barStartY - (barStartY - barEndY) / 5 * i + 5)
    }
}

//画出一个箭头
function drawBarAngle(barStartX, barStartY, turnX, turnY, barEndX, barEndY) {
    barCtx.lineWidth = 1;
    barCtx.moveTo(barStartX, barStartY);
    barCtx.lineTo(turnX, turnY);
    barCtx.lineTo(barEndX, barEndY);
    barCtx.stroke();
}

//生成销售数据，返回一个二维数组
function formatBarData(source) {
    var data = [];
    for (var i = 0; i < source.length; i++) {
        var sale = source[i].sale;
        data.push(sale);
    }
    return data;
}

//获取最大销售值
function getMaxBarSale(data) {
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

//清空画布
function cleanBarCanvas() {
    barCtx.clearRect(0, 0, barCanvasWidth, barCanvasHeight);
}