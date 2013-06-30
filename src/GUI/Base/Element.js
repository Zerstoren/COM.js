(function() {

    var Element = function(config) {
        this.init(config);
    };

    Element.prototype.$super = 'Element';

    Element.prototype.init = function(config) {
        this.super('Observer', 'init', []);

        this.$Element_Config = {
            id: undefined,
            class: undefined,
            extraClass: undefined,
            holder: undefined,
            html: undefined,

            identifyWrapper: 'wrap_element_' + String.random(8),
            tagWrapper: 'span',
            useWrapper: true,
            visible: true,
        };

        Object.merge(this.$Element_Config, config);

        this.$Element_Holder = null;
        this.$Element_Wrapper = null;

        this.registerEvents([
            'render', 'hide', 'show', 'move', 'changeHtml'
        ]);
    };

    /**
     * Производит отрисовку контета в облать холдера
     * @return {void}
     */
    Element.prototype.render = function() {
        var $ = packeg('$');

        if(this.$Element_Holder === null) {
            this.$Element_Holder = $(this.$Element_Config.holder);

            if(this.$Element_Config.useWrapper === false) {
                this._SetDefaultRenderInfo(
                    this.$Element_SelectDefaultContext(),
                    this.$Element_Config
                );

                this.$Element_Holder.html(this.$Element_Config.html);
            }
        }

        if(this.$Element_Wrapper === null && this.$Element_Config.useWrapper === true) {
            this.$Element_Wrapper = $('<' + this.$Element_Config.tagWrapper + '>');
            this._SetDefaultRenderInfo(
                this.$Element_SelectDefaultContext(),
                this.$Element_Config
            );
            this.$Element_Wrapper.append(this.$Element_Config.html);
        }

        this.$Element_Holder.append(this.$Element_Wrapper);

        this.fireEvent('render');
    };

    /**
     * Прячит контент
     * @return {void}
     */
    Element.prototype.hide = function() {
        this.$Element_Holder.css({display: 'none'});
        this.fireEvent('hide');
    };

    /**
     * Показывает контент
     * @return {void}
     */
    Element.prototype.show = function() {
        var actionFor = this.$Element_SelectDefaultContext();

        actionFor.css({display: 'block'});
        this.fireEvent('show');
    };

    /**
     * Переводит контент из одной облости в другую
     * @param  {string} position Новая позиция селектора
     * @return {void}
     */
    Element.prototype.move = function(position) {
        this.clean();
        this.$Element_Holder = null;
        this.$Element_Config.holder = position;
        this.fireEvent('move');
        this.render();
    };

    /**
     * Производит очистку места, где находится итем
     * @return {void}
     */
    Element.prototype.clean = function() {
        if(this.$Element_Wrapper !== null) {
            this.$Element_Holder.find(this.$Element_Wrapper).detach();
        } else if(this.$Element_Config.useWrapper === false) {
            this._SetDefaultRenderInfo(
                this.$Element_SelectDefaultContext(),
                this.$Element_Config
            );

            this.$Element_Holder.empty();
        }
    };

    /**
     * Возвращает HTML код, данного блока
     * @return {[type]} [description]
     */
    Element.prototype.getHtml = function() {
        return this.$Element_SelectDefaultContext().html();
    };

    /**
     * Устанавливает HTML код для данного элемента
     * @param {string} setHtml Новый HTML код
     * @return {void}
     */
    Element.prototype.setHtml = function(setHtml) {
        this.$Element_Config.html = setHtml;
        this.$Element_SelectDefaultContext().html(this.$Element_Config.html);
        this.fireEvent('changeHtml');
        this.render();
    };

    /**
     * Производит выборку, текущего аткивного элемента для заливки данных
     * @private
     * @return {jQuery} Активный класс
     */
    Element.prototype.$Element_SelectDefaultContext = function() {
        return this.$Element_Wrapper ? this.$Element_Wrapper : this.$Element_Holder;
    };

    Object.extend(
        Element,
        packeg('COM.Extend'),
        packeg('COM.Events.Observer'),
        packeg('COM.GUI.Base.Extern').prototype
    );

    packeg('COM.GUI.Base.Element', Element);

})();
