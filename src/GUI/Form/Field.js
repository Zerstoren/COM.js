(function() {
    /**
     * Базовый класс для реализации всех типов полей
     *
     * @package COM.GUI.Form.Field
     */
    var Field = function() {
        throw new Error('COM.GUI.Form.Field is abstract class');
    };

    Field.prototype.$super = 'Field';

    Field.prototype.init = function(cfg) {
        this.$Field_Element = null;

        this.$Field_Config = Object.merge({
            value: '',
            placeholder: undefined
        }, cfg || {});

        this.$Field_Element = this.$Field_CreateElement();

        this.$Field_InitElement();
        this.$Field_InitDomEvents();

        if(this.$Field_Config.placeholder) {
            this.setPlaceholder(this.$Field_Config.placeholder);
        }

        if(this.$Field_Config.value) {
            this.setValue(this.$Field_Config.value);
        }
    };

    /**
     * Производит иницилизацию элемента в Element классе
     * @return {void}
     */
    Field.prototype.$Field_InitElement = function() {
        this.$Field_Config.element = this.$Field_Element;

        this.super('Element', 'init', [this.$Field_Config]);
    };

    /**
     * Производит иницилизацию событий
     * @return {void}
     */
    Field.prototype.$Field_InitDomEvents = function() {
        this.super('DomEvents', 'init', [
            this.$Field_Element,
            this.$Field_Config
        ]);
    };

    /**
     * Возврашает значение инпута
     * @return {string} значение инпута
     */
    Field.prototype.getValue = function() {
        return this.$Field_Element.val();
    };

    /**
     * Устанавливает значение инпута
     * @param  {string} val Значение инпута
     * @return {this}
     */
    Field.prototype.setValue = function(val) {
        this.$Field_Element.val(val);
        return this;
    };

    /**
     * Устанавливает плейсохолдер элемента
     * @param  {string} placeholder Значение плейсхолдера
     * @return {this}
     */
    Field.prototype.setPlaceholder = function(placeholder) {
        this.$Field_Config.placeholder = placeholder;
        this.$Field_Element.attr('placeholder', placeholder);
        return this;
    };

    /**
     * Делает доступным для ввода данных
     * @return {this}
     */
    Field.prototype.disable = function() {
        this.$Field_Element.attr('disabled', 'disabled');
        return this;
    };

    /**
     * Делает не доступным для ввода данных
     * @return {this}
     */
    Field.prototype.enable = function() {
        this.$Field_Element.removeAttr('disabled');
        return this;
    };

    /**
     * Валидация элемента
     * @param {string} null Тип валидации
     * @param {mixed}  null параметры относительно типа валидации
     * @return {boolean}
     */
    Field.prototype.validate = function() {
        var args = Array.merge([], arguments),
            type = args.shift();

        if(this['Validate_Method_' + type] === undefined) {
            throw new Error('Undefined validate type `' + type + '`');
        }

        return this['Validate_Method_' + type].apply(this, args);
    };

    /**
     * Тип валидации "обязательно для заполнения"
     * @return {boolean} Результат валидации
     */
    Field.prototype.Validate_Method_Required = function() {
        return !!this.getValue();
    };

    /**
     * Тип валидации "Cовпадение по патерну"
     * @return {boolean} Результат валидации
     */
    Field.prototype.Validate_Method_Pattern = function(pattern, flags) {
        var value = this.getValue(),
            regExp = new RegExp(pattern, flags);

        return regExp.test(value);
    };

    /**
     * Тип валидации "Совпадение с значением друго-го поля"
     * @return {boolean} Результат валидации
     */
    Field.prototype.Validate_Method_Match = function(other) {
        if(!other.hasInterface('COM.GUI.Interfaces.FieldInterface')) {
            throw new Error('Validate Math argument dont have interface FieldInterface');
        }

        return this.getValue() === other.getValue();
    };

    /**
     * Абстрактный метод, который должен быть перезаписан для формирования HTML
     * @return {void}
     */
    Field.prototype.$Field_CreateElement = function() {
        throw new Error('Field.$Field_CreateElement is abstract method and need be override');
    };

    Object.extend(
        Field,
        package('COM.Events.DomEvents'),
        package('COM.GUI.Base.Element').prototype
    );

    Object.interface(
        Field,
        package('COM.GUI.Interfaces.FieldInterface')
    );

    package('COM.GUI.Form.Field', Field);

})();
