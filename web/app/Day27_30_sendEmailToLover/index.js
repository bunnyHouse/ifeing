var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var sugs = document.querySelector('#email-sug-wrapper');
var emailInput = document.querySelector('#email-input');

var nowSelectTipIndex = 0;
var sugsCount = 0;

window.onload = function() {
    emailInput.focus();
};


//添加输入框输入事件监听，当有输入时自动显示匹配项
emailInput.addEventListener('input', function() {
    nowSelectTipIndex = 0;
    initSugsList();
});

//添加列表点击事件监听，当点击列表项时将列表项内容放入输入框并隐藏下拉列表
sugs.addEventListener('click', function(e) {
    if (e.target.nodeName === 'LI') {
        emailInput.value = e.target.getAttribute('value');
        hideSug();
        emailInput.focus();
    }
});

//添加上下键及回车键事件监听，上下键控制列表项选择，回车键将列表内容输入到输入框
emailInput.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
        case 38:    //方向上键
            moveUpSelectSug();
            initSugsList();
            break;
        case 40:    //方向下键
            moveDownSelectSug();
            initSugsList();
            break;
        case 13:    //回车键
            var select = document.querySelector('.active').textContent;
            emailInput.value = select;
            hideSug();
            break;
        case 27:    //esc键
            emailInput.select();
            break;
    }
});

//生成并显示下拉列表
function initSugsList() {
    var input = getEmailInput();
    var email = parseInput(input);
    var emails = createEmailLi(email);
    appendToUl(emails);
    isShowSug(input);
}

//方向上键触发选择列表项向上移动
function moveUpSelectSug() {
    if (nowSelectTipIndex === 0) {
        nowSelectTipIndex = sugsCount - 1;
    } else {
        nowSelectTipIndex--;
    }
}

//方向下键触发选择列表项向下移动
function moveDownSelectSug() {
    if (nowSelectTipIndex === sugsCount - 1) {
        nowSelectTipIndex = 0;
    } else {
        nowSelectTipIndex++;
    }
}

//获取输入框内容
function getEmailInput() {
    return HtmlUtil.htmlEncode(emailInput.value.trim());
}

//处理输入框内容
function parseInput(input) {
    input = HtmlUtil.htmlDecode(input);
    var email = input;
    var loc = '';
    if (input.indexOf('@') !== -1) {
        email = input.substring(0, input.indexOf('@'));
        loc = input.substr(input.indexOf('@') + 1);
    }
    return {email: email, loc: loc};
}

//创建li列表
function createEmailLi(e) {
    var emailList = [];
    var email = e.email;
    var loc = e.loc;
    //将匹配的后缀组合后生成li元素
    sugsCount = 0;
    for (var i = 0; i < postfixList.length; i++) {
        if (('@' + postfixList[i]).indexOf('@' + loc) !== -1) {
            var emailLi = document.createElement('li');
            var completeEmail = email + '@' + postfixList[i];
            emailLi.setAttribute('value', completeEmail);
            emailLi.textContent = completeEmail;
            emailList.push(emailLi);
            sugsCount++;
        }
    }
    //若没有匹配项则全部显示
    if (!emailList.length) {
        for (var i = 0; i < postfixList.length; i++) {
            var emailLi = document.createElement('li');
            var completeEmail = email + '@' + postfixList[i];
            emailLi.setAttribute('value', completeEmail);
            emailLi.textContent = completeEmail;
            emailList.push(emailLi);
            sugsCount++;
        }
    }
    emailList[nowSelectTipIndex].setAttribute('class', 'active');
    return emailList;
}

//将li放入ul中
function appendToUl(emails) {
    sugs.innerHTML = '';
    for (var i = 0; i < emails.length; i++) {
        sugs.appendChild(emails[i]);
    }
}

//判断是否显示列表
function isShowSug(input) {
    if (!input || input === '') {
        hideSug();
    } else {
        showSug();
    }
}

//显示列表
function showSug() {
    sugs.style.display = 'block';
}

//隐藏列表
function hideSug() {
    sugs.style.display = 'none';
}

