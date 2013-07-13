(function() {
    /**
     * Класс для реализации маппера для Radio кнопок
     * @private
     */
    var RadioMapper = function() {
        this.init();
    };

    RadioMapper.prototype.uncheck = function() {
        this.$ElementMapper_Map('uncheck', []);
    };

    RadioMapper.prototype.disable = function() {
        this.$ElementMapper_Map('disable', []);
    };

    RadioMapper.prototype.enable = function() {
        this.$ElementMapper_Map('enable', []);
    };

    Object.extend(
        RadioMapper,
        package('COM.Extend'),
        package('COM.GUI.Base.ElementMapper').prototype
    );

    /**
     * Класс отрисовки группы радио кнопок
     *
     * @package COM.GUI.Form.RadioGroup
     */
    var RadioGroup = function(cfg) {
        this.init(cfg);
    };

    RadioGroup.prototype.$super = 'RadioGroup';

    RadioGroup.prototype.init = function(cfg) {
        this.$RadioGroup_Element = null;
        this.$RadioGroup_Mapper = new RadioMapper();
        this.$RadioGroup_Config = Object.merge({
            data: [],
            class: 'field-radiogroup',
            name: undefined,

            radioClass: undefined,
            radioFirstText: false,
            radioWrapperClass: 'field-radio-wrapper',
            radioRadioClass: 'field-radio'
        }, cfg || {});

        if(this.$RadioGroup_Config.name === undefined) {
            this.$RadioGroup_Config.name = String.random();
        }

        this.super('Field', 'init', [this.$RadioGroup_Config]);

        this.setData(this.$RadioGroup_Config.data);
    };

    /**
     * Устанавливает новые итемы в списке и удаляет старые
     * @param  {array} data Список радио кнопок
     * @return {this}
     */
    RadioGroup.prototype.setData = function(data) {
        var i, max;

        this.$RadioGroup_Mapper.clear();
        for(i = 0, max = data.length; i < max; i++) {
            this.push(data[i]);
        }

        return this;
    };

    /**
     * Добавляет новый итем в конец списка
     * @param  {object} data Объект радио кнопки
     * @return {this}
     */
    RadioGroup.prototype.push = function(data) {
        var node = new (package('COM.GUI.Form.Radio'))({
            holder: this.$RadioGroup_Element,
            class: this.$RadioGroup_Config.radioClass,
            firstText: this.$RadioGroup_Config.radioFirstText,
            name: this.$RadioGroup_Config.name,
            text: data.text,
            value: data.value,
            checked: data.checked
        });

        this.$RadioGroup_Mapper.push(node);

        return this;
    };

    /**
     * Удаляет итем по индексу
     * @param  {integer} n Индекс итема
     * @return {this}
     */
    RadioGroup.prototype.remove = function(n) {
        var item = this.$RadioGroup_Mapper.getElement(n);
        this.$RadioGroup_Mapper.remove(item);

        return this;
    };

    /**
     * Производит отрисовку радио кнопок
     * @return {this}
     */
    RadioGroup.prototype.render = function() {
        this.super('Field', 'render', []);
        this.$RadioGroup_Mapper.render();

        return this;
    };

    /**
     * Установка элемента как выбранного
     * @param  {integer} n индекс элемента
     * @return {this}
     */
    RadioGroup.prototype.select = function(n) {
        var item = this.$RadioGroup_Mapper.getElement(n);
        this.$RadioGroup_Mapper.uncheck();

        item.check();

        return this;
    };

    /**
     * Проверка, выбрана ли хоть одна радио кнопка
     * @return {boolean}
     */
    RadioGroup.prototype.isSelected = function() {
        var items = this.$RadioGroup_Mapper.getElements();

        for(var i = items.length; i--;) {
            if(items[i].isChecked()) {
                return true;
            }
        }

        return false;
    };

    /**
     * Получает значение из поля
     * @return {mixed} Текст выбранного значения, если не вабран, вернет false
     */
    RadioGroup.prototype.getValue = function() {
        var items = this.$RadioGroup_Mapper.getElements();

        for(var i = items.length; i--;) {
            if(items[i].isChecked()) {
                return items[i].getValue();
            }
        }

        return false;
    };

    /**
     * Устанавливает значение к радио кнопке
     * @param  {integer} n     Индекс радио кнопки
     * @param  {string}  value Новое значение для кнопки
     * @return {this}
     */
    RadioGroup.prototype.setValue = function(n, value) {
        var item = this.$RadioGroup_Mapper.getElement(n);
        item.setValue(value);

        return this;
    };

    RadioGroup.prototype.disable = function() {
        this.$RadioGroup_Mapper.disable();
        return this;
    };

    RadioGroup.prototype.enable = function() {
        this.$RadioGroup_Mapper.enable();
        return this;
    };

    RadioGroup.prototype.getIndexByValue = function(value) {
        var i, items = this.$RadioGroup_Mapper.getElements();

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
    RadioGroup.prototype.$Field_CreateElement = function() {
        var $ = package('$');
        this.$RadioGroup_Element = $('<div>');
        return this.$RadioGroup_Element;
    };

    Object.extend(
        RadioGroup,
        package('COM.GUI.Form.Field').prototype
    );

    package('COM.GUI.Form.RadioGroup', RadioGroup);
})();
