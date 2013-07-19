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

    Button.prototype.setText = function(content) {
        if(String.is(content)) {
            this.$Button_Element.html(content);
            this.$Button_Config.value = content;
        } else if(content === undefined) {
            this.$Button_Element.html('');
            this.$Button_Config.value = '';
        } else {
            if(
                !content.hasInterface('COM.GUI.Interfaces.RenderInterface') ||
                !content.hasInterface('COM.GUI.Interfaces.HolderInterface')
            ) {
                throw new Error('Content don`t have Render or Holder interfaces');
            }

            this.$Button_Element.empty();
            content.setHolder(this.$Button_Element);
            content.render();
            this.$Button_Config.value = content;
        }
    };

    /**
     * Создание HTML кнопки
     * @return {voud}
     */
    Button.prototype.$Button_CreateButton = function() {
        var $ = package('$');
        this.$Button_Element = $('<button>');
        this.setText(this.$Button_Config.value);
    };

    Object.extend(
        Button,
        package('COM.GUI.Base.Element').prototype,
        package('COM.Events.DomEvents')
    );

    package('COM.GUI.Form.Button', Button);

})();
