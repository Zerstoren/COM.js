(function() {

    var Config = {};
    Config.$super = 'Config';

    Config.init = function(cfg) {
        this.$Config = Object.merge({
            layer: false, // Слой

            sizeX: 0, // Ширина рабочей области
            sizeY: 0, // Высота рабочей области

            mapSizeX: 0, // Кол-во ячеек по ширине
            mapSizeY: 0, // Кол-во ячеек пл высоте

            chankSizeX: 0, // Кол-во ячеек входящих в чанк по ширине
            chankSizeY: 0, // Кол-во ячеек входящих в чанк по высоте

            itemSizeX: 0, // Ширина клетки
            itemSizeY: 0 // Высота клетки
        }, cfg || {});

        this.$Config.layer = new (package('COM.App.Layer'))({
            holder: this.getConf('holder'),
            width: this.getConf('sizeX'),
            height: this.getConf('sizeY'),
            clear: false,
            zindex: 1
        });
        this.getConf('layer').render();
        this.$Config_AttachEvents();
    };

    Config.getConf = function(name) {
        if(this.$Config[name] === undefined) {
            throw new Error('undefined config name `' + name + '`');
        }

        return this.$Config[name];
    };

    Config.$Config_AttachEvents = function() {
        this.getConf('layer').subscribe('resize', this.resizeCanvas.bind(this));
    };

    package('COM.Map.Config', Config);

})();
