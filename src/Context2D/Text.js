(function() {

    var Text = {};

    Text.fillText = function(text, x, y, fontSize, fontSpace, width) {
        this.drawText('fillText', text, x, y, fontSize, fontSpace, width);
    };

    Text.strokeText = function(text, x, y, fontSize, fontSpace, width) {
        this.drawText('strokeText', text, x, y, fontSize, fontSpace, width);
    };

    Text.drawText = function(type, text, x, y, fontSize, fontSpace, width) {
        var i, max, measure;
        y += fontSize;

        for(i = 0, max = text.length; i < max; i++) {
            measure = this.$Text_MeasureAlign(text, width);
            this.ctx[type](text[i], x + measure, y);
            y = y + fontSize + fontSpace;
        }
    };

    Text.$Text_MeasureAlign = function(text, width) {
        var measure,
            align = this.ctx.textAlign;

        if(align === 'center') {
            return Math.round(width / 2);
        } else if(align === 'end' || align === 'right') {
            return Math.round(width);
        } else {
            return 0;
        }
    };

    packeg('COM.Context2d.Text', Text);
})();
