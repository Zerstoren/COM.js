(function() {
    /**
     * Базовый элемент множества объектов.
     * Он включает методы по управлению и отрисовке элементов на странице
     *
     * @package COM.GUI.Base.Element
     */

    var Element = function(config) {
        this.init(config);
    };

    Element.prototype.$super = 'Element';

    Element.prototype.init = function(config) {
        var $ = packeg('$');
        this.super('Observer', 'init', []);

        this.$Element_Config = {
            id: undefined,
            class: undefined,
            extractClass: undefined,
            holder: undefined,
            element: undefined,

            visible: true
        };

        Object.merge(this.$Element_Config, config);

        if(this.$Element_Config.element === undefined) {
            throw new Error('COM.GUI.Base.Element not contain in config `element`');
        }

        this.$Element_Holder = typeof this.$Element_Config.holder === 'string' ?
            $(this.$Element_Config.holder) : this.$Element_Config.holder;

        this.$Element_Element = typeof this.$Element_Config.element === 'string' ?
            $(this.$Element_Config.element) : this.$Element_Config.element;

        if(this.$Element_Config.class) {
            this.$Element_Element.addClass(this.$Element_Config.class);
        }

        if(this.$Element_Config.extractClass) {
            this.$Element_Element.addClass(this.$Element_Config.extractClass);
        }

        if(this.$Element_Config.id) {
            this.$Element_Element.attr('id', this.$Element_Config.id);
        }

        this.registerEvents([
            'render', 'hide', 'show', 'move', 'changeHtml'
        ]);
    };

    /**
     * Производит отрисовку контета в облать холдера
     * @return {void}
     */
    Element.prototype.render = function() {
        this.$Element_Holder.append(this.$Element_Element);
        this.fireEvent('render');
        return this;
    };

    /**
     * Прячите контент
     * @return {void}
     */
    Element.prototype.hide = function() {
        this.css({display: 'none'});
        this.fireEvent('hide');
        return this;
    };

    /**
     * Показывает контент
     * @return {void}
     */
    Element.prototype.show = function() {
        this.css({display: 'block'});
        this.fireEvent('show');
        return this;
    };

    /**
     * Устанавливает стили к элементу, аналогичен jquery.css
     * @param  {string} name  Имя
     * @param  {string} value Опция
     * @return {mixed}
     */
    Element.prototype.css = function(name, value) {
        return this.$Element_Element.css(name, value);
    };

    /**
     * Производит очистку места, где находится итем
     * @return {void}
     */
    Element.prototype.clean = function() {
        this.$Element_Element.detach();
    };

    /**
     * Возвращает HTML код, данного блока
     * @return {[type]} [description]
     */
    Element.prototype.getHTML = function() {
        return this.$Element_Element.html();
    };

    /**
     * Возвращает холдер
     * @return {Object} Объект текущего холдера
     */
    Element.prototype.getHolder = function() {
        return this.$Element_Holder;
    };

    /**
     * Устанавливает холдер
     * @param  {string} holder CSS Селектор нового холдера
     * @return {this}
     */
    Element.prototype.setHolder = function(holder) {
        var $ = packeg('$');
        this.$Element_Holder = typeof holder === 'string' ? $(holder) : holder;
        return this;
    };

    /**
     * Переводит контент из одной облости в другую
     * @param  {string} position Новая позиция селектора
     * @return {this}
     */
    Element.prototype.move = function(holder) {
        var $ = packeg('$');

        this.clean();
        this.setHolder(holder);

        this.fireEvent('move');
        this.render();

        return this;
    };

    Object.extend(
        Element,
        packeg('COM.Extend'),
        packeg('COM.Events.Observer'),
        packeg('COM.GUI.Base.Extern').prototype
    );

    Object.interface(
        Element,
        packeg('COM.GUI.Interfaces.RenderInterface'),
        packeg('COM.GUI.Interfaces.HolderInterface')
    );

    packeg('COM.GUI.Base.Element', Element);

})();
