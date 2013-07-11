(function() {
    /**
     * Класс для реализации объекта кнопки
     *
     * @package COM.GUI.Form.Button
     */
    var Button = function(config) {
        this.init(config);
    };

    Button.prototype.$super = 'Button';

    Button.prototype.init = function(config) {
        this.$Button_Element = null;
        this.$Button_Config = {
            value: 'Button',
            holder: undefined
        };

        Object.merge(this.$Button_Config, config);

        this.$Button_CreateButton();

        this.super('Element', 'init', [{
            'element': this.$Button_Element,
            'holder': this.$Button_Config.holder
        }]);

        this.super('DomEvents', 'init', [
            this.$Button_Element,
            this.$Button_Config
        ]);
    };

    /**
     * Создание HTML кнопки
     * @return {voud}
     */
    Button.prototype.$Button_CreateButton = function() {
        var $ = packeg('$');
        this.$Button_Element = $('<button>');
        this.$Button_Element.html(this.$Button_Config.value);
    };

    Object.extend(
        Button,
        packeg('COM.GUI.Base.Element').prototype,
        packeg('COM.Events.DomEvents')
    );

    packeg('COM.GUI.Form.Button', Button);

})();
