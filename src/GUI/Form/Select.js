(function() {
    /**
     * Объект для реализации инпутов
     *
     * @package COM.GUI.Form.Select
     */
    var Select = function(cfg) {
        this.init(cfg);
    };

    Select.prototype.$super = 'Select';

    Select.prototype.init = function(cfg) {
        this.$Select_Element = null;
        this.$Select_Options = [];
        this.$Select_Config = Object.merge({
            data: [],
            class: 'field-select'
        }, cfg || {});

        this.super('Field', 'init', [this.$Select_Config]);

        this.setData(this.$Select_Config.data);
    };

    /**
     * устанавливает данные для селекта
     * @param  {array}  items Список опций
     * @return {this}
     */
    Select.prototype.setData = function(items) {
        var i, max, option,
            $ = package('$');

        this.$Select_Element.empty();
        this.$Select_Options = [];

        for(i = 0, max = items.length; i < max; i++) {
            if(items[i].group === true) {
                option = this.$Select_SetDataOptionGroup(items[i]);
            } else {
                option = $('<option>');
                option
                    .val(items[i].value)
                    .html(items[i].text)
                    .attr('selected', items[i].selected);
            }

            this.$Select_Element.append(option);
            this.$Select_Options[i] = option;
        }

        return this;
    };

    /**
     * Возвращает список опций
     * @return {array} список опций селекта
     */
    Select.prototype.getOptions = function() {
        return this.$Select_Options;
    };

    /**
     * Устанавливает значение для элемента
     * @return {this}
     */
    Select.prototype.setSelected = function(value) {
        this.$Select_Element.val(value);
        return this;
    };

    /**
     * Возвращает, выбран ли какой-то элемент
     * @return {boolean}
     */
    Select.prototype.isSelected = function() {
        return !this.$Select_Element.val();
    };

    /**
     * Система рекурсивной установки опций
     * @param  {array}  data итемы в группе
     * @return {object}      HTML объект группы опций
     */
    Select.prototype.$Select_SetDataOptionGroup = function(data) {
        var i, max, optgroup, option,
            $ = package('$');

        optgroup = $('<optgroup>');
        optgroup.attr('label', data.text);
        optgroup.attr('title', data.text);

        for(i = 0, max = data.items.length; i < max; i++) {
            if(data.items[i].group === true) {
                option = this.$Select_SetDataOptionGroup(data.items[i]);
            } else {
                option = $('<option>');
                option
                    .val(data.items[i].value)
                    .html(data.items[i].text)
                    .attr('selected', data.items[i].selected);
            }

            optgroup.append(option);
        }

        return optgroup;
    };

    /**
     * Создает HTML элемент
     * @return {[type]} [description]
     */
    Select.prototype.$Field_CreateElement = function() {
        var $ = package('$');
        this.$Select_Element = $('<select>');
        return this.$Select_Element;
    };

    Object.extend(
        Select,
        package('COM.GUI.Form.Field').prototype
    );

    package('COM.GUI.Form.Select', Select);

})();
