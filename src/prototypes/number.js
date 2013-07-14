(function() {

    var idCounter = 0;
    Number.uniqueId = function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    Number.is = function(number) {
        return typeof number === 'number';
    }

})();
