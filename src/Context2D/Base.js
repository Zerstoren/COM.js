(function() {

    var Base = {};

    /**
     * Заливает прямоугольник
     */
    Base.fillRect = function() {
        var opt = Base.$researchPosition(arguments);
        this.ctx.fillRect(opt[0], opt[1], opt[2], opt[3]);
    };

    /**
     * Обводит прямоугольник
     */
    Base.strokeRect = function() {
        var opt = Base.$researchPosition(arguments);
        this.ctx.strokeRect(opt[0], opt[1], opt[2], opt[3]);
    };

    /**
     * Очищает прямоугольник
     */
    Base.clearRect = function() {
        var opt = Base.$researchPosition(arguments);
        this.ctx.clearRect(opt[0], opt[1], opt[2], opt[3]);
    };

    /**
     * Применяет ряд фильтров
     * @param  {array} listOfChanges Список изменений
     */
    Base.applyStyle = function(listOfChanges) {
        var i, max;
        for(i = 0, max = listOfChanges.length; i < max; i++) {
            this.ctx[listOfChanges[i][0]] = listOfChanges[i][1];
        }
    };

    /**
     * Сохраняет текущие параметры и возвращает их
     * @param  {array}  listOfParams Список изменяемых параметров
     * @return {object}              Список параметров с значениеями,
     *                                которые будут возврашены на место
     */
    Base.revertSaveStyle = function(listOfParams) {
        var i, max, param, params = {};
        for(var i = 0, max = listOfParams.length; i < max; i++) {
            param = listOfParams[i];
            params[param] = this.ctx[param];
        }

        return params;
    };

    /**
     * Возвращает все параметры в прежнее состояние
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    Base.applyRevertStyle = function(params) {
        Object.merge(this.ctx, params);
    };

    /**
     * Данная функция производит поиск позиции отрисовки, исходя из переданых аргументов
     * @return {array} Позиция для отрисовки
     */
    Base.$researchPosition = function(args) {
        var elem, x, y, width, height, itemRectangle;
        if(args.length === 1) {
            elem = args[0];
            itemRectangle = elem.getRectangle();

            x = itemRectangle.x;
            y = itemRectangle.y;
            width = itemRectangle.width;
            height = itemRectangle.height;
        } else if(args.length === 4) {
            x = args[0];
            y = args[1];
            width = args[2];
            height = args[3];
        }

        return [x, y, width, height];
    };

    packeg('COM.Context2d.Base', Base);
})();