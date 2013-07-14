(function() {

    var GroupShapes = function() {
        this.init();
    };

    GroupShapes.prototype.init = function() {
        this.super('Cache', 'init');

        this.isGroup = true;

        this.group = [];
    };

    /**
     * Добавляет новый объект в группу
     * @param  {object} shape Любая фигура, которая может быть отрисована на канвасе
     * @return {this}
     */
    GroupShapes.prototype.push = function(shape) {
        shape.subscribe_for_all(this.$GroupShapes_SubscibeForAll.bind(this, shape));
        this.group.push(shape);
        return this;
    };

    /**
     * Убирает объект из группы
     * @param  {object} shape Ранее добавленый объект
     * @return {this}
     */
    GroupShapes.prototype.remove = function(shape) {
        shape.unsubscribe_for_all(this.$GroupShapes_SubscibeForAll.bind(this, shape));
        Array.remove(this.group, shape);
        return this;
    };

    /**
     * Вызывает указаную функцию у объектов из группы
     * @param {string}  Имя вызываемой функции
     * @param {mixed} Аргументы вызываемой функции
     * @return {this}
     */
    GroupShapes.prototype.groupAction = function() {

        var i, max,
            args = Array.clone(arguments),
            methodName = args.shift(),
            methodValue = args;

        for(i = 0, max = this.group.length; i < max; i++) {
            if(this.group[i][methodName] !== undefined) {
                this.group[i][methodName].apply(this.group[i], methodValue);
            }
        }

        return this;
    };

    /**
     * Возвращает список всех объектов в группе
     * @return {Array} Список всех объектов в группе
     */
    GroupShapes.prototype.getGroup = function() {
        return this.group;
    };

    /**
     * Возвращает прямоугольник, в которой входят все фигуры
     * @return {object} Координаты и высота с шириной всей области, куда входит данные прямоугольник
     */
    GroupShapes.prototype.getBoundingRect = function() {
        var i, max, group,
            topLeft = {x: 100000, y: 100000},
            topLeftSet = false,
            bottomRight = {x: 0, y: 0},
            bottomRightSet = false;

        for(i = 0, max = this.group.length; i < max; i++) {
            group = this.group[i];
            if(group.position.x < topLeft.x) {
                topLeft.x = group.position.x;
                topLeftSet = true;
            }

            if(group.position.y < topLeft.y) {
                topLeft.y = group.position.y;
                topLeftSet = true;
            }

            if(group.position.x + group.size.width > bottomRight.x) {
                bottomRight.x = group.position.x + group.size.width;
                bottomRightSet = true;
            }

            if(group.position.y + group.size.height > bottomRight.y) {
                bottomRight.y = group.position.y + group.size.height;
                bottomRightSet = true;
            }
        }

        if(topLeftSet === false || bottomRightSet === false) {
            topLeft.x = 0;
            topLeft.y = 0;
            bottomRight.x = 0;
            bottomRight.y = 0;
        }

        return {
            x: topLeft.x,
            y: topLeft.y,
            width: bottomRight.x - topLeft.x,
            height: bottomRight.y - topLeft.y
        };
    };

    /**
     * Создает кэш данной группы
     * @return {this}
     */
    GroupShapes.prototype.createCache = function(first_argument) {
        if(this.group.length === 0) {
            throw new Error('Сначало нужно добавить объекты в группу, а потом создавать кэш');
        }

        this.super('Cache', 'createCache', [this.group]);
    };

    /**
     * Подписывается на все события объектов
     * @param  {object} shape      Фигура, у которой произошло событие
     * @param  {string} eventName  Имя события
     * @param  {mixed}  eventValue Значение события
     */
    GroupShapes.prototype.$GroupShapes_SubscibeForAll = function(shape, eventName, eventValue) {
        var i, max;
        eventName = eventName + 'Group';

        for(i = 0, max = group.length; i < max; i++) {
            if(this.group[i] === shape && this.group[i].hasEvent(eventName)) {
                this.group[i].fireEvent(eventName, value);
            }
        }
    };

    Object.extend(
        GroupShapes,
        package('COM.Extend'),
        package('COM.Utils.Cache')
    );

    package('COM.Shapes.GroupShapes', GroupShapes);
})();
