(function() {

    var LayerInit = {};

    LayerInit.$super = 'LayerInit';

    LayerInit.init = function() {
        this.registerEvents(['pushToLayer', 'removeFromLayer']);

        this.moveToAnimate = false;

        this.subscribe('pushToLayer', function(layer) {
            this.layer = layer;
        }.bind(this));

        this.subscribe('removeFromLayer', function() {
            delete this.layer;
        }.bind(this));
    };

    packeg('COM.Utils.LayerInit', LayerInit);

})();