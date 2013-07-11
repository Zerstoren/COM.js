(function() {
    /**
     * Создает поле ввода текста
     *
     * @package COM.GUI.Form.Textarea
     */
    var TextArea = function(cfg) {
        this.init(cfg);
    };

    TextArea.prototype.$super = 'TextArea';

    TextArea.prototype.init = function(cfg) {
        this.$TextArea_Config = Object.merge({
            value: '',
            class: 'field-textarea'
        }, cfg || {});

        this.super('Field', 'init', [cfg]);
    };

    TextArea.prototype.$Field_CreateElement = function() {
        var $ = packeg('$');
        this.$TextArea_Element = $('<textarea>');
        return this.$TextArea_Element
            .val(this.$TextArea_Config.value);
    };

    Object.extend(
        TextArea,
        packeg('COM.GUI.Form.Field').prototype
    );

    packeg('COM.GUI.Form.TextArea', TextArea);

})();
