var Layer = packeg('COM.App.LayerWorker');
var Head = function() {
    this.init();
};

Head.prototype.init = function() {
    this.super('Observer', 'init');
    this.super('Rectangle', 'init');
    this.super('LayerInit', 'init');
};

Object.extend(
    Head,
    packeg('COM.Events.Observer'),
    packeg('COM.Utils.Animation'),
    packeg('COM.Utils.LayerInit'),
    packeg('COM.Shapes.Rectangle').prototype
);

var rect = new Head();
rect.setPosition(20, 20)
    .setSize(20, 20);

var rect1 = new Head();
rect1.setPosition(0, 0)
    .setSize(20, 20);

var rect2 = new Head();
rect2.setPosition(0, 0)
    .setSize(20, 20);

var rect3 = new Head();
rect3.setPosition(0, 0)
    .setSize(20, 20);



layer = new Layer({
    height: 300,
    width: 600
});

layer.push(rect);
layer.push(rect1);
layer.push(rect2);
layer.push(rect3);

