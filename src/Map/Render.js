(function() {

    var Render = {};
    Render.$super = 'Render';

    Render.init = function() {
        this.$Render_Layer = this.getConf('layer');
        this.$Render_Layer.push(this);
    };

    package('COM.Map.Render', Render);

})();
