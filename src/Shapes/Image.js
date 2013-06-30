(function() {
    var Img = function() {
        this.init();
    };

    Img.prototype.$super = 'Image';

    Img.prototype.init = function() {
        this.super('Rectangle', 'init');
        this.setDrawInfo({method: 'image'});
    };

    /**
     * Устанавливает изображение
     * @param  {Image} image Изображение, которое будет применено к отрисовке
     * @return {this}
     */
    Img.prototype.setImage = function(image) {
        this.DrawImage = image;
        return this;
    }

    Object.extend(
        Img,
        packeg('COM.Shapes.Rectangle').prototype
    );

    packeg('COM.Shapes.Image', Img);

})();