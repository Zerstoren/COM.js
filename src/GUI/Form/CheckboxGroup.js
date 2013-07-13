(function() {
    /**
     * Класс реализации маппера для Checkbox кнопок
     * @private
     */
    var CheckboxMapper = function() {
        this.init();
    };

    CheckboxMapper.prototype.uncheck = function() {
        this.$ElementMapper_Map('uncheck', []);
    };

    CheckboxMapper.prototype.check = function() {
        this.$ElementMapper_Map('check', []);
    };

    CheckboxMapper.prototype.disable = function() {
        this.$ElementMapper_Map('disable', []);
    };

    CheckboxMapper.prototype.enable = function() {
        this.$ElementMapper_Map('enable', []);
    };

    Object.extend(
        CheckboxMapper,
        package('COM.Extend'),
        package('COM.GUI.Base.ElementMapper').prototype
    );


    var CheckboxGroup = function(cfg) {
        this.init(cfg);
    };

    CheckboxGroup.prototype.$super = 'CheckboxGroup';


    CheckboxGroup.prototype.init = function(cfg) {
        this.$CheckboxGroup_Element = null;
        this.$CheckboxGroup_Mapper = new CheckboxMapper();
        this.$CheckboxGroup_Config = Object.merge({
            data: [],
            class: 'field-checkboxgroup',
            name: undefined,

            checkboxClass: undefined,
            checkboxFirstText: false,
            checkboxWrapperClass: 'field-checkbox-wrapper',
            checkboxCheckboxClass: 'field-checkbox'
        }, cfg || {});

        if(this.$CheckboxGroup_Config.name === undefined) {
            this.$CheckboxGroup_Config.name = String.random();
        }

        this.super('Field', 'init', [this.$CheckboxGroup_Config]);

        this.setData(this.$CheckboxGroup_Config.data);
    };

    /**
     * Устанавливает новые итемы в списке и удаляет старые
     * @param  {array} data Список чекбоксов
     * @return {this}
     */
    CheckboxGroup.prototype.setData = function(data) {
        var i, max;

        this.$CheckboxGroup_Mapper.clear();
        for(i = 0, max = data.length; i < max; i++) {
            this.push(data[i]);
        }

        return this;
    };

    /**
     * Добавляет новый итем в конец списка
     * @param  {object} data Объект чекбокса
     * @return {this}
     */
    CheckboxGroup.prototype.push = function(data) {
        var node = new (package('COM.GUI.Form.Checkbox'))({
            holder: this.$CheckboxGroup_Element,
            class: this.$CheckboxGroup_Config.radioClass,
            firstText: this.$CheckboxGroup_Config.radioFirstText,
            name: this.$CheckboxGroup_Config.name,
            text: data.text,
            value: data.value,
            checked: data.checked
        });

        this.$CheckboxGroup_Mapper.push(node);

        return this;
    };

    /**
     * Удаляет итем по индексу
     * @param  {integer} n Индекс итема
     * @return {this}
     */
    CheckboxGroup.prototype.remove = function(n) {
        var item = this.$CheckboxGroup_Mapper.getElement(n);
        this.$CheckboxGroup_Mapper.remove(item);

        return this;
    };

    /**
     * Производит отрисовку чекбоксов
     * @return {this}
     */
    CheckboxGroup.prototype.render = function() {
        this.super('Field', 'render', []);
        this.$CheckboxGroup_Mapper.render();

        return this;
    };

    /**
     * Установка элемента как выбранного
     * @param  {integer} n индекс элемента
     * @return {this}
     */
    CheckboxGroup.prototype.check = function(n) {
        var item = this.$CheckboxGroup_Mapper.getElement(n);
        item.check();

        return this;
    };

    /**
     * Установка элемента как не выбранного
     * @param  {integer} n индекс элемента
     * @return {this}
     */
    CheckboxGroup.prototype.uncheck = function(n) {
        var item = this.$CheckboxGroup_Mapper.getElement(n);
        item.uncheck();

        return this;
    };

    /**
     * Установка элемента как выбранного
     * @return {this}
     */
    CheckboxGroup.prototype.checkAll = function() {
        this.$CheckboxGroup_Mapper.check();
        return this;
    };

    /**
     * Установка элемента как не выбранного
     * @return {this}
     */
    CheckboxGroup.prototype.uncheckAll = function() {
        this.$CheckboxGroup_Mapper.uncheck();
        return this;
    };

    /**
     * Проверка, выбран ли хоть один чекбокс
     * @return {boolean}
     */
    CheckboxGroup.prototype.isChecked = function() {
        var items = this.$CheckboxGroup_Mapper.getElements();

        for(var i = items.length; i--;) {
            if(items[i].isChecked()) {
                return true;
            }
        }

        return false;
    };

    CheckboxGroup.prototype.getValue = function() {
        throw new Error('Checkbox Group can`t return one value, use method getValues');
    };

    /**
     * Получает значения со всех чекбоксов
     * @return {array} Текст выбранных значений
     */
    CheckboxGroup.prototype.getValues = function() {
        var items = this.$CheckboxGroup_Mapper.getElements(),
            data = [];

        for(var i = items.length; i--;) {
            if(items[i].isChecked()) {
                data.push(items[i].getValue());
            }
        }

        return data;
    };

    /**
     * Устанавливает значение к чекбоксу
     * @param  {integer} n     Индекс чекбокса
     * @param  {string}  value Новое значение для чекбокса
     * @return {this}
     */
    CheckboxGroup.prototype.setValue = function(n, value) {
        var item = this.$CheckboxGroup_Mapper.getElement(n);
        item.setValue(value);

        return this;
    };

    /**
     * Выключает все чекбоксы
     * @return {this}
     */
    CheckboxGroup.prototype.disable = function() {
        this.$CheckboxGroup_Mapper.disable();
        return this;
    };

    /**
     * Включает все чекбоксы
     * @return {this}
     */
    CheckboxGroup.prototype.enable = function() {
        this.$CheckboxGroup_Mapper.enable();
        return this;
    };

    /**
     * Получение индекса кнопки по значению
     * @param  {string} value Value чекбокса
     * @return {[type]}       [description]
     */
    CheckboxGroup.prototype.getIndexByValue = function(value) {
        var i, items = this.$CheckboxGroup_Mapper.getElements();

        for(i = items.length; i--; ) {
            if(items[i].getValue() === value) {
                return i;
            }
        }

        return -1;
    };

    /**
     * Создает HTML элемент
     */
    CheckboxGroup.prototype.$Field_CreateElement = function() {
        var $ = package('$');
        this.$CheckboxGroup_Element = $('<div>');
        return this.$CheckboxGroup_Element;
    };

    Object.extend(
        CheckboxGroup,
        package('COM.GUI.Form.Field').prototype
    );

    package('COM.GUI.From.CheckboxGroup', CheckboxGroup);

})();
