(function() {

    var LayerWorker = function(config) {
        this.init(config);
    };

    // <!---- Расширение прототипа Layer ----> //
    LayerWorker.prototype.init = function(config) {
        var worker = packeg('COM.Core.Worker');

        this.$LayerWorker_CanUpdate = true;

        this.$LayerWorker_Worker = new worker(packeg('COM.App.LayerCalculateWorker'));
        this.$LayerWorker_Worker.start();

        this.super('Layer', 'init', [config]);

        this.$LayerWorker_Worker.rename(this.$Layer_Personal_Id);
        this.$LayerWorker_OnResize();
    };

    /**
     * Производит добавление фигуры к слою
     * @param {object} figure Объект фигуры
     * @param {object} config Конфиги фигуры
     * @return {strig}        Идентификатор фигуры
     */
    LayerWorker.prototype.push = function(figure, config) {
        this.super('Layer', 'push', [figure, config]);
        this.$LayerWorker_Message('pushFigure', {config: config, info: figure.DrawInfo});
    };

    /**
     * Производит удаление фигуры из слоя
     * @param {object} figure Объект фигуры на удаление
     */
    LayerWorker.prototype.remove = function(figure) {
        var name = figure.$Layer_name;
        this.super('Layer', 'remove', [figure]);
        this.$LayerWorker_Message('removeFigure', name);
    };

    /**
     * Начинает бесконечную итерацию кадров
     * @protected
     * @return {void}
     */
    LayerWorker.prototype.$Layer_Iterate = function() {
        if(this.$Layer_NeedUpdate === true && this.$LayerWorker_CanUpdate === true) {
            this.$Layer_NeedUpdate = false;
            this.$LayerWorker_CanUpdate = false;
            this.$LayerWorker_StartDraw();
        } else if(this.$LayerWorker_CanUpdate === true) {
            requestAnimationFrame(this.$Layer_Iterate.bind(this));
        }
    };

    /**
     * Добавляет события к данному слою
     * @protected
     * @return {void}
     */
    LayerWorker.prototype.$Layer_AttachEvents = function() {
        this.$LayerWorker_Worker.subscribe('onmessage', this.$LayerWorker_WorkerListener.bind(this));
        this.subscribe('resize', this.$LayerWorker_OnResize.bind(this));
        this.super('Layer', '$Layer_AttachEvents');
    };

    /**
     * Убирает события с данного слоя
     * @protected
     * @return {void}
     */
    LayerWorker.prototype.$Layer_DettachEvents = function() {
        this.$LayerWorker_Worker.unsubscribe('onmessage', this.$LayerWorker_WorkerListener.bind(this));
        this.super('Layer', '$Layer_DettachEvents');
    };


    // <!---- Собственные прототипы ----> //
    /**
     * Воркер, оповещающий о начале всей отрисовки
     * @protected
     * @return {void}
     */
    LayerWorker.prototype.$LayerWorker_StartDraw = function() {
        this.$LayerWorker_Message('draw', this.$Layer_Figures_DrawInfo);
    };

    /**
     * Метод для получения сообщений с воркера
     * @protected
     * @return {void}
     */
    LayerWorker.prototype.$LayerWorker_WorkerListener = function(data) {
        switch(data.action) {
            case 'clear':
                this.$LayerWorker_FromWorkerClearAreas(data.value);
                break;
            case 'draw':
                this.$LayerWorker_FromWorkerDrawItems(data.value);
                break;
            case 'complete':
                this.$LayerWorker_DrawComplete();
                break;
        }
    };

    LayerWorker.prototype.$LayerWorker_FromWorkerClearAreas = function(data) {
        for(var i = 0, max = data.length; i < max; i++) {
            this.$Layer_Context.clearRect(
                data[i].x, data[i].y, data[i].width, data[i].height
            );
        }
    };

    LayerWorker.prototype.$LayerWorker_FromWorkerDrawItems = function(data) {
        for(var i = 0, max = data.length; i < max; i++) {
            this.$Layer_Context.draw(this.$Layer_Figures[data[i]]);
            this.$Layer_Figures[data[i]].DrawInfo.Updated = false;
        }
    };

    /**
     * Метод для отправки сообщений в воркер
     * @protected
     * @param {string} action Имя экшена сообщения
     * @param {mixed}  value  Данные для отправки
     */
    LayerWorker.prototype.$LayerWorker_Message = function(action, value, debug) {
        this.$LayerWorker_Worker.message({action: action, value: value}, debug);
    };

    /**
     * Установка флагов о том, что отрисовка закончилась
     * @protected
     * @return {void}
     */
    LayerWorker.prototype.$LayerWorker_DrawComplete = function() {
        this.$LayerWorker_CanUpdate = true;
        requestAnimationFrame(this.$Layer_Iterate.bind(this));
    };

    /**
     * Производит оповещение воркера о изменении размера канвас окна
     * @return {void}
     */
    LayerWorker.prototype.$LayerWorker_OnResize = function() {
        this.$LayerWorker_Message('setSize', {
            width: this.$Layer_Element.width,
            height: this.$Layer_Element.height
        });
    };

    Object.extend(
        LayerWorker,
        packeg('COM.App.Layer').prototype
    );

    packeg('COM.App.LayerWorker', LayerWorker);
})();