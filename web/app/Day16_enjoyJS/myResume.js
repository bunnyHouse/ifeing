window.onload = function() {
    var submitBtn = document.getElementById('interact-btn');
    submitBtn.addEventListener('click', function() {
        var yourname = document.getElementById('interact-input').value;
        var greet = document.getElementById('interact-greet');
        var date = new Date();
        var now = date.getHours();
        var timeGreet = '';
        if (now > 4 && now < 12) {
            timeGreet = 'Good morning';
        } else if (now < 18) {
            timeGreet = 'Good afternoon';
        } else {
            timeGreet = 'Good evening';
        }
        greet.innerHTML = yourname ? timeGreet + ', ' + yourname : '让我知道你是谁吧';
    });
};