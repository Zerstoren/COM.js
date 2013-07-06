(function() {
    var LayerCalculateWorker = function() {
        var ShapesIndex = {};
        var ShapesDraw = [];
        var ShapesConfig = [];
        var CanvasSize = {width: 0, height: 0};
        var GlobalClear = {};
        var GlobalUpdate = {};

        /**
         * Производит слияние объекта source в target
         * @param  {object} target Цель слияния
         * @param  {object} source Данные для слияния
         * @return {object}        Результат слияния
         */
        var $merge = function(target, source) {
            var name;
            for(name in source) {
                target[name] = source[name];
            }

            return target;
        };

        /**
         * Определяет, пересекаются ли source прямоугольник с target прямоугольником
         * @param  {object} source Данные о фигуре
         * @param  {object} target Данные о другой фигуре
         * @return {boolean}       Пересекаются ли прямоугольники
         */
        var $itemsIsCrossed = function(source, target) {
            var base = {
                from: {
                    x: source.Position.x,
                    y: source.Position.y
                },

                to: {
                    x: source.Position.x + source.Size.width,
                    y: source.Position.y + source.Size.height
                }
            };

            var find = {
                from: {
                    x: target.Position.x,
                    y: target.Position.y
                },

                to: {
                    x: target.Position.x + target.Size.width,
                    y: target.Position.y + target.Size.height
                }
            };

            var tmp;
            // Установка from, как наивысшей вершини, а to как наименьшей
            if(base.from.x > base.to.x) {
                tmp = base.from.x;
                base.from.x = base.to.x;
                base.to.x = tmp;
            }

            if(base.from.y > base.to.y) {
                tmp = base.from.y;
                base.from.y = base.to.y;
                base.to.y = tmp;
            }

            if(find.from.x > find.to.x) {
                tmp = find.from.x;
                find.from.x = find.to.x;
                find.to.x = tmp;
            }

            if(find.from.y > find.to.y) {
                tmp = find.from.y;
                find.from.y = find.to.y;
                find.to.y = tmp;
            }

            return (find.from.x <= base.from.x && base.from.x <= find.to.x || base.from.x <= find.from.x && find.from.x <= base.to.x) &&
                    (find.from.y <= base.from.y && base.from.y <= find.to.y || base.from.y <= find.from.y && find.from.y <= base.to.y);
        };

        /**
         * Добавляет новую фигуру
         * @param  {object} value Данные о фигуре
         * @return {void}
         */
        function newFigure(value) {
            value.info.Updated = true;

            ShapesIndex[value.info.DrawName] = value.info;
            ShapesDraw.push(value.info);
            ShapesConfig.push(value.config);
        }

        /**
         * Удаляет существующую фигуру
         * @param  {string} name Имя фигуры
         * @return {void}
         */
        function removeFigure(name) {
            var i, max;
            for(i = 0, max = ShapesDraw.length; i < max; i++) {
                if(ShapesDraw.DrawName === name) {
                    ShapesDraw.splice(i, 1);
                }
            }

            for(i = 0, max = ShapesConfig.length; i < max; i++) {
                if(ShapesConfig.DrawName === name) {
                    ShapesConfig.splice(i, 1);
                }
            }
        }

        /**
         * Просчеты для отрисовки фигур
         * @param  {object} items Список фигур на перерисовку
         * @return {void}
         */
        function drawPrepare(items) {
            var name, item,
                count = 0,
                forDelete = [];

            for(item in items) {
                if(items[item].Updated !== true) {
                    delete items[item];
                    continue;
                }

                count += 1;
            }

            if(count >= (ShapesDraw.length / 2)) {
                self.clearPositions([{
                    x: 0,
                    y: 0,
                    width: CanvasSize.width,
                    height: CanvasSize.height
                }]);

                for(item in items) {
                    include(item, items[item]);
                }

                return;
            }

            for(item in items) {
                include(item, items[item]);
                connectionsItemFindToClear(item);
            }

            for(item in GlobalClear) {
                forDelete.push({
                    x: ShapesIndex[item].Position.x,
                    y: ShapesIndex[item].Position.y,
                    width: ShapesIndex[item].Size.width,
                    height: ShapesIndex[item].Size.height
                });
            }

            self.clearPositions(forDelete);
        }

        /**
         * Рекурсивный поиск сопутствующих фигур, которые могут пересекаться
         * @param  {string} item Имя базовой фигуры
         * @return {void}
         */
        function connectionsItemFindToClear(item) {
            var i, drawName;
            if(GlobalClear[item] === true) {
                return;
            }

            GlobalClear[item] = true;

            for(i = ShapesDraw.length; i--;) {
                drawName = ShapesDraw[i].DrawName;
                if(GlobalClear[drawName] !== undefined) {
                    continue;
                }

                if($itemsIsCrossed(ShapesIndex[item], ShapesDraw[i]) === true) {
                    include(ShapesDraw[i].DrawName);
                    connectionsItemFindToClear(ShapesDraw[i].DrawName);
                }
            }
        }

        /**
         * Функция-установщик, которая помечает фигуру для переустановки
         * @param  {string} index Имя фигуры
         * @param  {object} data  Данные для установки
         * @return {void}
         */
        function include(index, data) {
            ShapesIndex[index].Updated = true;

            if(data) {
                ShapesIndex[index].newData = data;
            }
        }

        /**
         * Отправка сообщения о потребности очистки области
         * @param  {array} items Список итемов для очистки
         * @return {void}
         */
        function clearPositions(items) {
            self.message('clear', items);
        }

        /**
         * Пост подготовка данных о изменения в фигурах
         * @return {voud}
         */
        function startDraw() {
            var i, max, newData;

            draw = [];
            for(i = 0, max = ShapesDraw.length; i < max; i++) {
                if(ShapesDraw[i].Updated) {
                    newData = ShapesDraw[i].newData;
                    delete ShapesDraw[i].newData;
                    draw.push(ShapesDraw[i].DrawName);
                    ShapesDraw[i] = $merge(ShapesDraw[i], newData);
                    ShapesDraw[i].Updated = false;
                }
            }

            self.message('draw', draw);
            self.message('complete');
            GlobalClear = {};
        }

        /**
         * Слушает вхолящих сообщений от родительского процесса
         * @param  {object} event Объект сообщения
         * @return {void}
         */
        self.onmessage = function(event) {
            var data = event.data;

            switch(data.action) {
                case 'setSize':
                    CanvasSize.width = data.value.width;
                    CanvasSize.height = data.value.height;
                    break;

                case 'pushFigure':
                    newFigure(data.value);
                    break;

                case 'removeFigure':
                    removeFigure(data.value);
                    break;

                case 'draw':
                    drawPrepare(data.value);
                    startDraw();
            }
        };

        /**
         * Отправка сообщений на сервер
         * @param  {string} action Имя действия
         * @param  {mixed}  value  Данные действия
         * @return {void}
         */
        self.message = function(action, value) {
            self.postMessage({action: action, value: value});
        };
    };

    packeg('COM.App.LayerCalculateWorker', LayerCalculateWorker);
})();
