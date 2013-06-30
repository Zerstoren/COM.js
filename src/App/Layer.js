(function() {
    var Layer = function(config) {
        this.init(config);
    };

    Layer.$super = 'Layer';

    Layer.prototype.init = function(config) {
        var worker = packeg('COM.Core.Worker');

        this.super('Observer', 'init');
        this.registerEvents([
            'calculate', 'draw', 'resize', // События для подключаемых слушателей
            'update' // События для самой системы
        ]);

        this.$ = packeg('$');
        this._ = packeg('_');

        this.$Layer_Context = null;
        this.$Layer_Element = null;
        this.$Layer_Original = null;

        this.$Layer_NeedUpdate = false;

        this.$Layer_ReadyToDraw = true;

        this.$Layer_Canvas_Width = 0;
        this.$Layer_Canvas_Height = 0;

        this.$Layer_Personal_Id = this._.uniqueId('layer_');
        this.$Layer_Figures = {};  // Словарь всех фигур
        this.$Layer_Figures_List = [];  // Список всех фигур
        this.$Layer_Figures_Config = {};  // Конфиги фигур
        this.$Layer_Figures_DrawInfo = {};  // Инфа на отрисовку фигур
        this.$Layer_Figures_Listeners = {};  // Слушатели всех фигур

        this.$Layer_Worker = new worker(packeg('COM.App.LayerWorker'), this.$Layer_Personal_Id);
        this.$Layer_Worker.start();

        this.$Layer_Config = Object.merge({
            'holder': 'body',
            'width': 'auto',
            'height': 'auto',
            'zindex': 0,
            'fps': 60
        }, config || {});

        if(typeof this.$Layer_Config.holder === 'string') {
            this.$Layer_Config.holder = this.$(this.$Layer_Config.holder);
        }

        this.$Layer_CreateCanvas();
        this.$Layer_AttachEvents();
        this.$Layer_Iterate();
    };

    /**
     * Производит добавление фигуры к слою
     * @param {object} figure Объект фигуры
     * @param {object} config Конфиги фигуры
     * @return {strig}        Идентификатор фигуры
     */
    Layer.prototype.push = function(figure, config) {
        if(figure['$Layer_name'] !== undefined) {
            throw new Error('Figure already added to some layer');
        }

        var name = this._.uniqueId('figure_');

        config = Object.merge({}, config || {});

        figure['$Layer_name'] = name;
        figure['$Layer_config'] = config;

        this.$Layer_Figures[name] = figure;
        this.$Layer_Figures_List.push(figure);
        this.$Layer_Figures_Config[name] = config;

        if(figure.hasEvent('pushToLayer')) {
            figure.fireEvent('pushToLayer', this);
        }

        this.$Layer_NeedUpdate = true;

        return name;
    };

    /**
     * Производит удаление фигуры из слоя
     * @param {object} figure Объект фигуры на удаление
     */
    Layer.prototype.remove = function(figure) {
        var ev,
            name = figure['$Layer_name'];
        if(name === undefined) {
            throw new Error('Current figure, not contains in layer');
        }

        delete figure['$Layer_name'];
        delete figure['$Layer_config'];

        delete this.$Layer_Figures[name];
        delete this.$Layer_Figures_Config[name];
        Array.remove(this.$Layer_Figures_List, figure);

        if(figure.hasEvent('removeFromLayer')) {
            figure.fireEvent('removeFromLayer');
        }

        this.$Layer_NeedUpdate = true;
    };

    Layer.prototype.$Layer_Draw = function() {
        this.$Layer_Context.clearRect(
            0, 0, this.$Layer_Config.width, this.$Layer_Config.width
        );

        for(var i = 0, max = this.$Layer_Figures_List.length; i < max; i++) {
            this.$Layer_Context.draw(this.$Layer_Figures_List[i]);
        }
    };

    Layer.prototype.$Layer_Iterate = function() {
        if(this.$Layer_NeedUpdate === true) {
            this.fireEvent('calculate');
            this.$Layer_Draw();
            this.fireEvent('draw');
            this.$Layer_NeedUpdate = false;
        }

        requestAnimationFrame(this.$Layer_Iterate.bind(this));
    };

    Layer.prototype.$Layer_OnUpdate = function() {
        this.$Layer_NeedUpdate = true;
    };

    Layer.prototype.$Layer_Resize = function(ev) {
        this.fireEvent('resize');

        if(this.$Layer_Config.width === 'auto' || this.$Layer_Config.height === 'auto') {
            this.$Layer_Canvas_Height = this.$Layer_Element;
        }
    };

    Layer.prototype.$Layer_AttachEvents = function() {
        this.$(window).on('resize', this.$Layer_Resize.bind(this));
        this.subscribe('update', this.$Layer_OnUpdate.bind(this));
        this.$Layer_Worker.subscribe('onmessage', this.$Layer_WorkerListener.bind(this));
    };

    Layer.prototype.$Layer_DettachEvents = function() {
        this.$(window).off('resize', this.$Layer_Resize.bind(this));
        this.unsubscribe('update', this.$Layer_OnUpdate.bind(this));
    };

    /**
     * Блок для общения с воркером
     */
    Layer.prototype.$Layer_WorkerListener = function(data) {
        console.debug(data);
    };

    /**
     * Создает слой канваса
     * @return {[type]} [description]
     */
    Layer.prototype.$Layer_CreateCanvas = function() {
        var tmp,
            holder = this.$Layer_Config.holder,
            config = this.$Layer_Config;

        tmp = this.$('<canvas>');

        tmp.attr('id', this.$Layer_Personal_Id);
        tmp.css({
            zIndex: config.zindex
        });

        tmp.get(0).width = config.width === 'auto' ? document.innerWidth : config.width,
        tmp.get(0).height = config.height === 'auto' ? document.innerHeight : config.height


        holder.append(tmp);
        this.$Layer_Element = tmp;
        this.$Layer_Original = tmp[0];
        this.$Layer_Context = tmp[0].getContext('2d-com');
    };

    Object.extend(
        Layer,
        packeg('COM.Extend'),
        packeg('COM.Events.Observer')
    );

    packeg('COM.App.Layer', Layer);

})();
