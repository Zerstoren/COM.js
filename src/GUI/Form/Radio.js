(function() {
    /**
     * Класс для реализации радио кнопки
     *
     * @package COM.GUI.Form.Radio
     */
    var Radio = function(cfg) {
        this.init(cfg);
    };

    Radio.prototype.$super = 'Radio';

    Radio.prototype.init = function(cfg) {
        this.$Radio_Element = null;
        this.$Radio_RadioNode = null;
        this.$Radio_SpanNode = null;

        this.$Radio_Config = Object.merge({
            class: 'field-radio-label',
            name: '',
            text: '',
            firstText: false,
            checked: false,

            wrapperClass: 'field-radio-wrapper',
            radioClass: 'field-radio'
        }, cfg || {});

        this.super('Field', 'init', [this.$Radio_Config, true]);
    };

    /**
     * Устанавливает радио кнопку в позицию выбрано
     * @return {this}
     */
    Radio.prototype.check = function() {
        this.$Radio_RadioNode.attr('checked', 'checked');
        return this;
    };

    /**
     * Устанавливает радио кнопку в позицию не выбрано
     * @return {this}
     */
    Radio.prototype.uncheck = function() {
        this.$Radio_RadioNode.removeAttr('checked');
        return this;
    };

    /**
     * Устанавливает текст для лейбла
     * @return {this}
     */
    Radio.prototype.setText = function(text) {
        this.$Radio_SpanNode.html(text);
        return this;
    };

    /**
     * Проверяет, отмечена ли данная кнопка
     * @return {boolean}
     */
    Radio.prototype.isChecked = function() {
        return !!this.$Radio_SpanNode.attr('checked');
    };

    /**
     * Выключает кнопку для выбора
     * @return {this}
     */
    Radio.prototype.disable = function() {
        this.$Radio_RadioNode.attr('disabled', 'disabled');
        this.$Radio_Element.addClass('disbled');
        return this;
    };

    /**
     * Включает кнопку для выбора
     * @return {this}
     */
    Radio.prototype.enable = function() {
        this.$Radio_RadioNode.removeAttr('disabled');
        this.$Radio_Element.removeClass('disbled');
        return this;
    };

    /**
     * Получение value для кнопки
     * @return {this}
     */
    Radio.prototype.getValue = function() {
        return this.$Radio_RadioNode.val();
    };

    /**
     * Устанавливает значение для value радио кнопки
     * @return {this}
     */
    Radio.prototype.setValue = function(value) {
        this.$Radio_RadioNode.val(value);
        return this;
    };

    /**
     * Метод не доступный для радио кнопки
     * @return {void}
     */
    Radio.prototype.validate = function() {
        throw new Error('COM.GUI.Form.Radio not supported validate');
    };

    /**
     * Иницилизирует события евентов
     * @return {[type]} [description]
     */
    Radio.prototype.$Field_InitDomEvents = function() {
        this.super('DomEvents', 'init', [
            this.$Radio_RadioNode,
            this.$Field_Config
        ]);
    };

    /**
     * Создает HTML для радио кнопки
     * @return {void}
     */
    Radio.prototype.$Field_CreateElement = function() {
        var radioNode, spanNode, $ = packeg('$');
        this.$Radio_Element = $('<label>');

        spanNode = $('<span>');
        spanNode.html(this.$Radio_Config.text);

        radioNode = $('<input>');
        radioNode
            .attr('type', 'radio')
            .attr('name', this.$Radio_Config.name);

        if(this.$Radio_Config.wrapperClass) {
            spanNode.addClass(this.$Radio_Config.wrapperClass);
        }

        if(this.$Radio_Config.radioClass) {
            radioNode.addClass(this.$Radio_Config.radioClass);
        }

        if(this.$Radio_Config.checked === true) {
            this.check();
        }

        if(this.$Radio_Config.firstText === true) {
            this.$Radio_Element.append(spanNode);
            this.$Radio_Element.append(radioNode);
        } else {
            this.$Radio_Element.append(radioNode);
            this.$Radio_Element.append(spanNode);
        }

        this.$Radio_RadioNode = radioNode;
        this.$Radio_SpanNode = spanNode;

        return this.$Radio_Element;
    };

    Object.extend(
        Radio,
        packeg('COM.GUI.Form.Field').prototype
    );

    packeg('COM.GUI.Form.Radio', Radio);

})();
