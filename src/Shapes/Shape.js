/**
 * COM.Shapes.Shape
 *
 * Базовый класс для фигур, реализовавший в себе особенности всех фигур
 */

(function() {
    var Shape = function() {
        throw new Error('COM.Shapes.Shape is abstract class');
    };

    /**
     * @type {string}
     */
    Shape.prototype.$super = 'Shape';

    Shape.prototype.init = function() {
        this.super('Observer', 'init');

        this.DrawInfo = {};
        this.DrawInfo.Position = {x: 0, y: 0};
        this.DrawInfo.Size = {width: 0, height: 0};
        this.DrawInfo.DrawObjectName = Number.uniqueId();
        this.DrawInfo.DrawType = 'fill';
        this.DrawInfo.DrawAction = 'rect';
        this.DrawInfo.DrawFrom = 'from';
        this.DrawInfo.DrawStyleApply = [];
        this.DrawInfo.DrawStyleBack = [];
        this.DrawInfo.Updated = false;
    };

    /**
     * Установка типов отрисовки
     * @param {object} kwards Множественные настройки установленных стилей
     *     @property {string} type     Какой тип будет отрисован
     *         @variable image
     *         @variable rect
     *         @variable text
     *         @variable line
     *
     *     @property {object} style    Все стили данного объекта
     *
     *     @property {string} drawFrom С какой позиции будет происходить отрисвку
     *         @variable center
     *         @variable from
     */
    Shape.prototype.setDrawInfo = function(kwards) {
        if(kwards.method) {
            if(
                kwards.method === 'image' || kwards.method === 'rect' ||
                kwards.method === 'text' || kwards.method === 'line'
            ) {
                this.DrawInfo.DrawAction = kwards.method;
            } else {
                throw new Error('Setting wrong draw type');
            }
        }

        if(kwards.type) {
            if(kwards.type === 'fill' || kwards.type === 'stroke') {
                this.DrawInfo.DrawType = kwards.type;
            }
        }

        return this;
    };

    /**
     * Устанавливает стили для объекта
     * @param  {mixed}  params Имя параметра или список объектов
     * @param  {mixed}  value  Значение
     * @return {this}
     */
    Shape.prototype.setStyle = function(params, value) {
        var param,
            update = {};

        if(value !== undefined) {
            param = this.$Shape_RenameParam(params);
            update[param] = value;
            this.DrawInfo.DrawStyleApply.push([param, value]);
        } else {
            params.forEach(function(key, value) {
                param = this.$Shape_RenameParam(key);
                update[param] = value;
                this.DrawInfo.DrawStyleApply.push([param, value]);
            }, this);
        }

        this.setDrawInfo({style: update});
        this.update();
        return this;
    };

    /**
     * Убирает стиль, из списка стилей
     * @param  {string} param Имя стиля
     * @return {this}
     */
    Shape.prototype.rmStyle = function(param) {
        var i, max;

        for (i = 0, max = this.DrawInfo.DrawStyleApply.length; i < max; i++) {
            if(this.DrawInfo.DrawStyleApply[0] === param) {
                Array.remove(this.DrawInfo.DrawStyleApply, this.DrawInfo.DrawStyleApply[0]);
            }
        }
        this.update();
        return this;
    };

    /**
     * После отрисовки, возвращает стиль в указаное состояние
     * @param  {[type]} params [description]
     * @param  {[type]} value  [description]
     * @return {[type]}        [description]
     */
    Shape.prototype.backStyle = function(params) {
        this.DrawInfo.DrawStyleBack =
            this.DrawInfo.DrawStyleBack.concat(params.map(this.$Shape_RenameParam.bind(this)));
        return this;
    };

    Shape.prototype.update = function() {
        this.DrawInfo.Updated = true;
    };

    /**
     * Производит переименование параметров из алиасов, в браузерные вариации
     * @param  {string} param Алиас параметра
     * @return {string}       Имя браузерного параметра
     */
    Shape.prototype.$Shape_RenameParam = function(param) {
        switch(param) {
            case 'color':
                return this.DrawInfo.DrawType + 'Style';

            case 'opacity':
                return 'globalAlpha';

            case 'composite':
                return 'globalCompositeOperation';

            case 'shadow-opacity':
                return 'shadowBlur';

            case 'shadow-color':
                return 'shadowColor';

            case 'shadow-x':
                return 'shadowOffsetX';

            case 'shadow-y':
                return 'shadowOffsetY';

            case 'align':
                return 'textAlign';

            case 'valign':
                return 'textBaseline';

            default:
                return param;
        }
    };

    Object.extend(
        Shape,
        package('COM.Extend'),
        package('COM.Events.Observer')
    );

    package('COM.Shapes.Shape', Shape);
})();
