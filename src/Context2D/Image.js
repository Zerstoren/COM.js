(function() {
    var Img = {};

    Img.drawImage = function(data) {
        var image = data.image,
            x = data.x,
            y = data.y,
            width = data.width,
            height = data.height;

        if(width === 0 || height === 0) {
            throw new Error('При отрисовке изображения возникла ошибка.' +
                            'Оно имеет ширину 0 или высоту 0');
        }

        this.ctx.drawImage(
            image,
            x,
            y,
            width,
            height
        );

        return this;
    };

    package('COM.Context2d.Image', Img);
})();
