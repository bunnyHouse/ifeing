window.onload = function() {
    var submitBtn = document.getElementById('interact-btn');
    submitBtn.addEventListener('click', function() {
        var yourname = document.getElementById('interact-input').value;
        var greet = document.getElementById('interact-greet');
        greet.innerHTML = yourname ? 'Welcome, ' + yourname : '让我知道你是谁吧';
    });
};