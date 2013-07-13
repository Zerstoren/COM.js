(function() {
    var LayerCalculateWorker = function() {
        var ShapesIndex = {};
        var ShapesDraw = [];
        var ShapesConfig = [];
        var CanvasSize = {width: 0, height: 0};
        var GlobalClear = {};
        var GlobalUpdate = {};

        var $isEquals = function(a, b) {
            for(var i in a) {
                if(a[i] instanceof Array) {
                    continue;
                } else if(a[i] instanceof Object) {
                    if($isEquals(a[i], b[i]) === false) {
                        return false;
                    }
                } else if(a[i] !== b[i]) {
                    return false;
                }
            }

            return true;
        };

        var $merge = function(target, source) {
            var name;
            for(name in source) {
                target[name] = source[name];
            }

            return target;
        };

        var $size = function(obj) {
            var ob, count = 0;
            for(ob in obj) {
                count += 1;
            }

            return count;
        };

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

        function newFigure(value) {
            value.info.Updated = true;

            ShapesIndex[value.info.DrawName] = value.info;
            ShapesDraw.push(value.info);
            ShapesConfig.push(value.config);
        }

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
                    x: ShapesIndex[item].Position.x - 1,
                    y: ShapesIndex[item].Position.y - 1,
                    width: ShapesIndex[item].Size.width + 2,
                    height: ShapesIndex[item].Size.height + 2
                });
            }

            self.clearPositions(forDelete);
        }

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

        function include(index, data) {
            ShapesIndex[index].Updated = true;

            if(data) {
                ShapesIndex[index].newData = data;
            }
        }

        function clearPositions(items) {
            self.message('clear', items);
        }

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

        self.message = function(action, value) {
            self.postMessage({action: action, value: value});
        };
    };

    package('COM.App.LayerCalculateWorker', LayerCalculateWorker);
})();
