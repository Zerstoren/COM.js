(function() {
    /**
     * Создание цифрового инпута
     *
     * @package COM.GUI.Form.Number
     */
    var Number = function(cfg) {
        this.init(cfg);
    };

    Number.prototype.$super = 'Number';

    Number.prototype.init = function(cfg) {
        this.$Number_Config = Object.merge({
            value: 0,
            max: undefined,
            min: undefined,
            step: undefined,
            class: 'field-number'
        }, cfg || {});

        this.super('Field', 'init', [this.$Number_Config]);
    };

    /**
     * Создает HTML инпута
     * @return {object} Созданный элемента
     */
    Number.prototype.$Field_CreateElement = function() {
        var $ = package('$');
        this.$Number_Element = $('<input>');
        this.$Number_Element
            .attr('type', 'number')
            .attr('max', this.$Number_Config.max)
            .attr('min', this.$Number_Config.min)
            .attr('step', this.$Number_Config.step);
        this.setValue(this.$Number_Config.value);

        this.super('Field', 'init', [this.$Number_Config]);

        return this.$Number_Element;
    };

    /**
     * Устанавливает значение в инпут
     * @param  {integer} value Новое значение поля
     * @return {this}
     */
    Number.prototype.setValue = function(value) {
        this.$Number_Element.val(parseInt(value, 10));
        return this;
    };

    Object.extend(
        Number,
        package('COM.GUI.Form.Field').prototype
    );

    package('COM.GUI.Form.Number', Number);

})();
