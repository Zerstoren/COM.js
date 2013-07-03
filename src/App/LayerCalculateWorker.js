(function() {
    var LayerCalculateWorker = function() {
        var ShapesDraw = [];
        var ShapesConfig = [];
        var CanvasSize = {width: 0, height: 0};

        var $isEquals = function(a, b) {
            debugger;
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

        function newFigure(value) {
            value.info.Updated = true;
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
            var name;

            // Ищем инфу, о тех кому 100% надо обновление
            ShapesDraw.map(function(shape) {
                name = shape.DrawName;
                if(!items[name]) {
                    return;
                }

                if($isEquals(shape, items[name]) === false) {
                    shape.Updated = true;
                    shape.newData = items[name];
                }
            });
        }

        function clearPositions() {
            self.message('clear', [{
                x: 0, y: 0,
                width: CanvasSize.width,
                height: CanvasSize.height
            }]);
        }

        function startDraw() {
            var i, max, newData;

            clearPositions();

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
