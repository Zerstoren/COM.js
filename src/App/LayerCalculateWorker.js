(function() {
    var LayerCalculateWorker = function() {
        var ShapesIndex = {};
        var ShapesDraw = [];
        var ShapesConfig = [];
        var CanvasSize = {width: 0, height: 0};
        var GlobalClear = {};

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
            for(name in source) {
                target[name] = source[name];
            }

            return target;
        };

        var $itemsIsCrossed = function(source, target) {
            var sourceRect = {
                from: {
                    x: source.Position.x,
                    y: source.Position.y
                },

                to: {
                    x: source.Position.x + source.Size.width,
                    y: soruce.Position.y + source.Size.height
                }
            };

            var targetRect = {
                from: {
                    x: source.Position.x,
                    y: source.Position.y
                },

                to: {
                    x: source.Position.x + source.Size.width,
                    y: soruce.Position.y + source.Size.height
                }
            };

            return (
                source.from.y < target.to.y ||
                source.to.y > target.from.y ||
                source.to.x < target.from.x ||
                source.from.x > target.to.x
            )
/**
var intersects = function ( a, b ) {
    return ( a.y < b.y1 || a.y1 > b.y || a.x1 < b.x || a.x > b.x1 );
}

(a.x,a.y)--------------|
   |                   |
   |                   |
   |                   |
   |---------------(a.x1,a.y1)
(b.x,b.y)---------------------|
   |                          |
   |                          |
   |                          |
   |---------------------(b.x1,b.y1)

 */
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
            var name,
                count = 0,
                clear = [],
                namesForUpdate = [];

            // Ищем инфу, о тех кому 100% надо обновление
            ShapesDraw.map(function(shape) {
                name = shape.DrawName;
                if(!items[name]) {
                    return;
                }

                if($isEquals(shape, items[name]) === false) {
                    shape.Updated = true;
                    shape.newData = items[name];
                    count += 1;
                    namesForUpdate.push(shape.DrawName);
                }
            });

            if(count >= (ShapesDraw.length / 2)) {
                clear.push({
                    x: 0,
                    y: 0,
                    width: CanvasSize.width,
                    height: CanvasSize.height
                });

                self.clearPositions(clear);
            } else {
                connectionsItemFindToClear(namesForUpdate);
            }
        }

        function connectionsItemFindToClear(names) {
            var namesForUpdate;

            names.map(function(item) {

                self.log(ShapesIndex[item]);
            });
        }

        function clearPositions(items) {
            self.message('clear', items);
        }

        function startDraw() {
            var i, max, newData;

            draw = [];
            for(i = 0, max = ShapesDraw.length; i < max; i++) {
                if(ShapesDraw[i].Updated) {
                    draw.push(ShapesDraw[i].DrawName);
                    delete ShapesDraw[i].Updated
                    newData = ShapesDraw[i].newData;
                    delete ShapesDraw[i].newData;
                    ShapesDraw[i] = $merge(ShapesDraw[i], newData);
                }
            }

            self.message('draw', draw);
            self.message('complete')
        };

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
            };
        };

        self.message = function(action, value) {
            self.postMessage({action: action, value: value});
        };
    };

    packeg('COM.App.LayerCalculateWorker', LayerCalculateWorker);
})();
