(function() {

    var Map = function(config) {

    };

    Map.prototype.init = function(config) {
        this.super('Config', 'init', [config]);
    };

    Object.extend(
        Map,
        package('COM.Map.Config'),
        package('COM.Map.Render'),
        package('COM.Map.Objects'),
        package('COM.Map.Control'),
        package('COM.Map.GettersSetters')
    );

    package('COM.Map', Map);

})();
