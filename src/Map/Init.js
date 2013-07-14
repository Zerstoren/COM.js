(function() {

    var Map = function(config) {

    };

    Map.prototype.init = function(config) {
        this.$Map_Config = Object.merge({
            'layer': null,
            'size_x': 100,
            'size_y': 100
        }, config);
    };

    Map.prototype.setSize = function(x, y) {
        this.$Map_Config.size_x = x;
        this.$Map_Config.size_y = y;
    };

    Map.prototype.getSize = function() {
        return {
            x: this.$Map_Config.size_x,
            y: this.$Map_Config.size_y
        };
    };

    Object.extend(
        Map,
        package('COM.Events.Observer')
    );

    package('COM.Map', Map);

})();
