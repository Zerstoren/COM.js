(function() {
    var Layer = function(config) {
        this.init(config);
    };

    Layer.prototype.$super = 'Layer';

    Layer.prototype.init = function(config) {
        this.$Layer_Config = Object.merge({
            holder: 'body',
            width: 'auto',
            height: 'auto',
            clear: true,
            zindex: 0
        }, config || {});

        this.super('Observer', 'init');
        this.registerEvents([
            'resize', // События для подключаемых слушателей
            'update' // События для самой системы
        ]);

        this.$Layer_Context = null;
        this.$Layer_Element = null;
        this.$Layer_Original = null;

        this.$Layer_NeedUpdate = false;

        this.$Layer_ReadyToDraw = true;

        this.$Layer_Canvas_Width = 0;
        this.$Layer_Canvas_Height = 0;

        this.$Layer_Personal_Id = Number.uniqueId('layer_');
        this.$Layer_Figures = {};  // Словарь всех фигур
        this.$Layer_Figures_List = [];  // Список всех фигур
        this.$Layer_Figures_Config = {};  // Конфиги фигур
        this.$Layer_Figures_DrawInfo = {};  // Инфа на отрисовку фигур
        this.$Layer_Figures_Listeners = {};  // Слушатели всех фигур

        if(typeof this.$Layer_Config.holder === 'string') {
            this.$Layer_Config.holder = document.querySelector(this.$Layer_Config.holder);
        }

        this.$Layer_CreateCanvas();

        this.super('DomEvents', 'init', [this.$Layer_Element]);
        this.super('LayerEvents', 'init');

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
        if(figure.hasInstance('COM.Shapes.Rectangle') === false) {
            throw new Error('Added figure is not extended from COM.Shapes.Rectangle');
        }

        if(figure['$Layer_name'] !== undefined) {
            throw new Error('Figure already added to some layer');
        }

        var name = Number.uniqueId('figure_');

        if(config) {
            delete config.name;
            config = Object.merge({
                name: name
            }, config);
        }

        figure['$Layer_name'] = name;
        figure.DrawInfo.DrawName = name;
        figure['$Layer_config'] = config;

        this.$Layer_Figures[name] = figure;
        this.$Layer_Figures_DrawInfo[name] = figure.DrawInfo;
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

        delete figure.$Layer_name;
        delete figure.$Layer_config;
        delete figure.$Layer_name;
        delete figure.DrawInfo.DrawName;

        delete this.$Layer_Figures[name];
        delete this.$Layer_Figures_Config[name];
        Array.remove(this.$Layer_Figures_List, figure);

        if(figure.hasEvent('removeFromLayer')) {
            figure.fireEvent('removeFromLayer');
        }

        this.$Layer_NeedUpdate = true;
    };

    Layer.prototype.getFigure = function(name) {
        return this.$Layer_Figures[name];
    };

    /**
     * Производит отрисовку всех фигур на слой.
     * @protected
     * @return {void}
     */
    Layer.prototype.$Layer_Draw = function() {
        if(this.$Layer_Config.clear) {
            this.$Layer_Context.clearRect(
                0, 0, this.$Layer_Config.width, this.$Layer_Config.width
            );
        }

        for(var i = 0, max = this.$Layer_Figures_List.length; i < max; i++) {
            this.$Layer_Context.draw(this.$Layer_Figures_List[i]);
        }
    };

    /**
     * Начинает бесконечную итерацию кадров
     * @protected
     * @return {void}
     */
    Layer.prototype.$Layer_Iterate = function() {

        if(this.$Layer_NeedUpdate === true) {
            // Устанавливаем флаги о невозможности следующей отрисовки

            this.$Layer_Draw();
            this.$Layer_NeedUpdate = false;
        }

        requestAnimationFrame(this.$Layer_Iterate.bind(this));
    };

    /**
     * Событие обновления данных в слое
     * @protected
     * @return {void}
     */
    Layer.prototype.$Layer_OnUpdate = function() {
        this.$Layer_NeedUpdate = true;
    };

    /**
     * Событие ресайза окна
     * @protected
     * @param  {windowEvent} ev Браузерное событие
     * @return {void}
     */
    Layer.prototype.$Layer_Resize = function(ev) {
        if(this.$Layer_Config.width === 'auto' || this.$Layer_Config.height === 'auto') {
            this.$Layer_Canvas_Height = this.$Layer_Element;
        }

        this.fireEvent('resize');
    };

    /**
     * Добавляет события к данному слою
     * @protected
     * @return {void}
     */
    Layer.prototype.$Layer_AttachEvents = function() {
        window.addEventListener('resize', this.$Layer_Resize.bind(this));
        this.subscribe('update', this.$Layer_OnUpdate.bind(this));
    };

    /**
     * Убирает события с данного слоя
     * @protected
     * @return {void}
     */
    Layer.prototype.$Layer_DettachEvents = function() {
        window.removeEventListener('resize', this.$Layer_Resize.bind(this));
        this.unsubscribe('update', this.$Layer_OnUpdate.bind(this));    };


    /**
     * Создает слой канваса
     * @protected
     * @return {void}
     */
    Layer.prototype.$Layer_CreateCanvas = function() {
        var tmp,
            holder = this.$Layer_Config.holder,
            config = this.$Layer_Config;

        tmp = document.createElement('canvas');

        tmp.setAttribute('id', this.$Layer_Personal_Id);
        tmp.style.zIndex = config.zindex;

        tmp.width = config.width === 'auto' ? document.innerWidth : config.width,
        tmp.height = config.height === 'auto' ? document.innerHeight : config.height;

        holder.appendChild(tmp);
        this.$Layer_Element = tmp;
        this.$Layer_Context = tmp.getContext('2d-com');
    };

    Object.extend(
        Layer,
        package('COM.Extend'),
        package('COM.Events.Observer'),
        package('COM.Events.DomEvents'),
        package('COM.Events.LayerEvents')
    );

    package('COM.App.Layer', Layer);

})();
