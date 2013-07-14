(function() {

    var Text = function() {
        this.init();
    };

    Text.prototype.$super = 'Text';

    Text.prototype.init = function() {
        this.super('Rectangle', 'init');
        this.DrawText = '';

        this.DrawStyle = {
            size: 14,
            space: 4,
            family: 'Verdana',
            weight: 'normal',
            style: 'normal',
            variant: 'normal'
        };

        this.setDrawInfo({
            method: 'text'
        });

        this.setFont({});
    };

    /**
     * Устанавливает текст для отрисовки
     * @param  {string} text Текст для отрисовки
     * @return {this}
     */
    Text.prototype.setText = function(text) {
        this.DrawText = text.split("\n");

        if(package('COM.Config.Debug') === true && package('COM.Config.DebugTextSize') === true) {
            var y = this.DrawStyle.space +
                (this.DrawText.length * (this.DrawStyle.space + this.DrawStyle.size));

            if(y > this.size.height) {
                console.log('Данный текст не поместиться полностью в область прямоугольника');
                console.trace();
            }
        }

        return this;
    };

    /**
     * Устанавливает текст отрисовки
     * @param  {object} kwards Данные для отрисовки
     *     @subparam string  style    Стиль отрисовки normal|italic|oblique
     *     @subparam string  variant  Специальный вариант отрисовки normal|small-caps
     *     @subparam string  weight   Толщина шрифта normal|bold|bolder|ligher|100|200|...
     *     @subparam integer size     Кегль шрифта
     *     @subparam integer space    Межстрочный интервал
     *     @subparam string  family   Название шрифта
     * @return {this}
     */
    Text.prototype.setFont = function(kwards) {
        var font = Object.merge(this.DrawStyle, kwards);

        this.rmStyle('font');
        this.setStyle('font',
            font.style + ' ' + font.variant + ' ' + font.weight + ' ' +
            font.size + 'px ' + font.family
        );
        return this;
    };

    Object.extend(
        Text,
        package('COM.Shapes.Rectangle').prototype
    );

    package('COM.Shapes.Text', Text);

})();