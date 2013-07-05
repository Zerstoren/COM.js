/**
 * COM.Shapes.Rectangle
 *
 * Фигура для рисования прямоугольных областей
 */

(function() {
    var Rectangle = function() {
        this.init();
    };

    Rectangle.prototype.$super = 'Rectangle';

    Rectangle.prototype.init = function() {
        this.super('Shape', 'init');

        this.position = {x: 0, y: 0};
        this.size = {width: 0, height: 0};
        this.drawType = 'fill';
    };

    /**
     * Устанавливает левую верхнюю позицию элемента
     * @param  {int} x Позиция по оси X
     * @param  {int} y Позиция по оси Y
     * @return {this}
     */
    Rectangle.prototype.setPosition = function(x, y) {
        this.position.x = Number.isFinite(x) ? x : this.position.x;
        this.position.y = Number.isFinite(y) ? y : this.position.y;

        this.DrawInfo.Position.x = this.position.x;
        this.DrawInfo.Position.y = this.position.y;

        this.update();

        return this;
    };

    /**
     * Устанавливает ширину и высоту прямоугольника
     * @param  {int} width  Ширина прямоугольника
     * @param  {int} height Высота прямоугольника
     * @return {this}
     */
    Rectangle.prototype.setSize = function(width, height) {
        this.size.width = width || this.size.width;
        this.size.height = height || this.size.height;

        this.DrawInfo.Size.width = this.size.width;
        this.DrawInfo.Size.height = this.size.height;

        this.update();

        return this;
    };

    /**
     * Устанавливает тип отрисовки
     * @param  {string} type Тип отрисовки fill|stroke
     * @return {this}
     */
    Rectangle.prototype.setType = function(type) {
        this.setDrawInfo({
            type: type
        });

        this.update();

        return this;
    };

    /**
     * Возвращает размер прямоугольника
     * @return {object} Размер прямоугольника
     */
    Rectangle.prototype.getBoundingRect = function() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height
        };
    };

    Object.extend(
        Rectangle,
        packeg('COM.Shapes.Shape').prototype
    );

    packeg('COM.Shapes.Rectangle', Rectangle);
})();
