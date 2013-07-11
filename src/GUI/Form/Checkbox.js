(function() {
    /**
     * Класс для реализации объекта чекбокса
     *
     * @package COM.GUI.Form.Checkbox
     */
    var Checkbox = function(cfg) {
        this.init(cfg);
    };

    Checkbox.prototype.$super = 'Checkbox';

    Checkbox.prototype.init = function(cfg) {
        this.$Checkbox_Element = null;
        this.$Checkbox_CheckboxNode = null;
        this.$Checkbox_SpanNode = null;

        this.$Checkbox_Config = Object.merge({
            class: 'field-checkbox-label',
            name: '',
            text: '',
            firstText: false,
            checked: false,

            wrapperClass: 'field-checkbox-wrapper',
            CheckboxClass: 'field-checkbox'
        }, cfg || {});

        this.super('Field', 'init', [this.$Checkbox_Config, true]);
    };

    /**
     * Устанавливает данные чекбокс как отмеченный
     * @return {this}
     */
    Checkbox.prototype.check = function() {
        this.$Checkbox_CheckboxNode.attr('checked', 'checked');
        return this;
    };

    /**
     * Снимает отметку с чекбокса как выбранного
     * @return {this}
     */
    Checkbox.prototype.uncheck = function() {
        this.$Checkbox_CheckboxNode.removeAttr('checked');
        return this;
    };

    /**
     * Устанавливает значение value для чекбокса
     * @return {this}
     */
    Checkbox.prototype.setValue = function(value) {
        this.$Checkbox_CheckboxNode.val(value);
        return this;
    };

    /**
     * Изменяет label текст для чекбокса
     * @return {this}
     */
    Checkbox.prototype.setText = function(text) {
        this.$Checkbox_SpanNode.html(text);
        return this;
    };

    /**
     * Проверяет, выбран ли этот чекбокс
     * @return {boolean}
     */
    Checkbox.prototype.isChecked = function() {
        return !!this.$Checkbox_SpanNode.attr('checked');
    };

    /**
     * Выключает возможность выбора чекбокса
     * @return {this}
     */
    Checkbox.prototype.disable = function() {
        this.$Checkbox_CheckboxNode.attr('disabled', 'disabled');
        this.$Checkbox_Element.addClass('disbled');
        return this;
    };

    /**
     * Включает возможность выбора чекбокса
     * @return {this}
     */
    Checkbox.prototype.enable = function() {
        this.$Checkbox_CheckboxNode.removeAttr('disabled');
        this.$Checkbox_Element.removeClass('disbled');
        return this;
    };

    /**
     * Иницилизация Dom эвентов
     * @return {void}
     */
    Checkbox.prototype.$Field_InitDomEvents = function() {
        this.super('DomEvents', 'init', [
            this.$Checkbox_CheckboxNode,
            this.$Field_Config
        ]);
    };

    /**
     * Создание HTML разметки
     * @return {void}
     */
    Checkbox.prototype.$Field_CreateElement = function() {
        var checkboxNode, spanNode, $ = packeg('$');
        this.$Checkbox_Element = $('<label>');

        spanNode = $('<span>');
        spanNode.html(this.$Checkbox_Config.text);

        checkboxNode = $('<input>');
        checkboxNode
            .attr('type', 'checkbox')
            .attr('name', this.$Checkbox_Config.name);

        if(this.$Checkbox_Config.wrapperClass) {
            spanNode.addClass(this.$Checkbox_Config.wrapperClass);
        }

        if(this.$Checkbox_Config.CheckboxClass) {
            checkboxNode.addClass(this.$Checkbox_Config.CheckboxClass);
        }

        if(this.$Checkbox_Config.checked === true) {
            this.check();
        }

        if(this.$Checkbox_Config.firstText === true) {
            this.$Checkbox_Element.append(spanNode);
            this.$Checkbox_Element.append(checkboxNode);
        } else {
            this.$Checkbox_Element.append(checkboxNode);
            this.$Checkbox_Element.append(spanNode);
        }

        this.$Checkbox_CheckboxNode = checkboxNode;
        this.$Checkbox_SpanNode = spanNode;

        return this.$Checkbox_Element;
    };

    Object.extend(
        Checkbox,
        packeg('COM.GUI.Form.Field').prototype
    );

    packeg('COM.GUI.Form.Checkbox', Checkbox);

})();
