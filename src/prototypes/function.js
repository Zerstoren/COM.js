(function() {

    if(window.requestAnimationFrame === undefined) {
        window.requestAnimationFrame =
            window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame;
    }


    Function.is = function(fn) {
        return fn instanceof Function;
    }

})();
