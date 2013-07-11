(function() {
    /**
     * Создает текстовое поле
     *
     * @package COM.GUI.Form.Text
     */
    var Text = function(cfg) {
        this.init(cfg);
    };

    Text.prototype.$super = 'Text';

    Text.prototype.init = function(cfg) {
        this.$Text_Config = Object.merge({
            value: '',
            placeholder: '',
            class: 'field-text'
        }, cfg || {});

        this.super('Field', 'init', [this.$Text_Config]);
    };

    Text.prototype.$Field_CreateElement = function() {
        var $ = packeg('$');
        this.$Text_Element = $('<input>');
        return this.$Text_Element
            .attr('type', 'text')
            .val(this.$Text_Config.value);
    };

    Object.extend(
        Text,
        packeg('COM.GUI.Form.Field').prototype
    );

    packeg('COM.GUI.Form.Text', Text);

})();
