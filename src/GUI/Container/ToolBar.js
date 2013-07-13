(function() {
    /**
     * Контейнер для размещения элементов в определенном порядке
     * и абстрагирование над их позиционированием
     *
     * @package COM.GUI.Container.ToolBar
     */
    var ToolBar = function(cfg) {
        this.init(cfg);
    };

    ToolBar.prototype.init = function(cfg) {
        var $ = package('$');

        this.$ToolBar_Config = Object.merge({
            class: 'container-toolbar',
            id: undefined,
            holder: undefined,

            extractClass: '',

            left: [],
            right: []
        }, cfg || {});

        this.$ToolBar_Holder = $(this.$ToolBar_Config.holder);

        this.$ToolBar_MapperLeft = this.$ToolBar_CheckItems(this.$ToolBar_Config.left);
        this.$ToolBar_MapperRight = this.$ToolBar_CheckItems(this.$ToolBar_Config.right);

        this.$ToolBar_BuildHtml();

        this.$ToolBar_MapperLeft.setHolder(this.$ToolBar_Left);
        this.$ToolBar_MapperRight.setHolder(this.$ToolBar_Right);

        this.$ToolBar_MapperLeft.render();
        this.$ToolBar_MapperRight.render();
    };

    /**
     * Производит отрисовку тулбара
     * @return {this}
     */
    ToolBar.prototype.render = function() {
        this.$ToolBar_Holder.append(this.$ToolBar_Parent);
        return this;
    };

    /**
     * Производит удаление тулбара
     * @return {this}
     */
    ToolBar.prototype.clean = function() {
        this.$ToolBar_Parent.detach();
        return this;
    };

    /**
     * Производит перемещение тулбара
     * @return {this}
     */
    ToolBar.prototype.move = function(holder) {
        var $ = package('$');

        this.clean();
        this.setHolder(holder);
        this.render();
        return this;
    };

    /**
     * Производит установку нового холдера
     * @return {this}
     */
    ToolBar.prototype.setHolder = function(holder) {
        this.$ToolBar_Holder = $(holder);
        return this;
    };

    /**
     * Показывает тулбар
     * @return {this}
     */
    ToolBar.prototype.show = function() {
        this.$ToolBar_Parent.css({display: 'block'});
        return this;
    };

    /**
     * Прячет тулбар
     * @return {this}
     */
    ToolBar.prototype.hide = function() {
        this.$ToolBar_Parent.css({display: 'none'});
        return this;
    };

    /**
     * Метод для постройки HTML структуры
     * @return {void}
     */
    ToolBar.prototype.$ToolBar_BuildHtml = function() {
        var $ = package('$');

        this.$ToolBar_Parent = $('<div>');
        this.$ToolBar_Parent
            .addClass(this.$ToolBar_Config.class)
            .addClass(this.$ToolBar_Config.extractClass)
            .attr('id', this.$ToolBar_Config.id);

        this.$ToolBar_Left = $('<div>');
        this.$ToolBar_Left
            .addClass('left-toolbar');

        this.$ToolBar_Right = $('<div>');
        this.$ToolBar_Right
            .addClass('right-toolbar');

        this.$ToolBar_Parent.append(this.$ToolBar_Left);
        this.$ToolBar_Parent.append(this.$ToolBar_Right);
        this.$ToolBar_Parent.append('<div class="clear">');
    };

    /**
     * Проверка интерфейсов элементов и после создание и возвращение мапперов
     * @param  {object} items Элемент для отрисовки
     * @return {object}       Возврат маппера этой группы элементов
     */
    ToolBar.prototype.$ToolBar_CheckItems = function(items) {
        var mapper = new (package('COM.GUI.Base.ElementMapper'))();

        for(var i = 0, max = items.length; i < max; i++) {
            if(
                !items[i].hasInterface('COM.GUI.Interfaces.RenderInterface') ||
                !items[i].hasInterface('COM.GUI.Interfaces.HolderInterface')
            ) {
                throw new Error('Added to toolbar element dont have interfaces: RenderInterface or HolderInterface');
            }

            mapper.push(items[i]);
        }

        return mapper;
    };

    Object.extend(
        ToolBar,
        package('COM.Extend')
    );

    Object.interface(
        ToolBar,
        package('COM.GUI.Interfaces.RenderInterface'),
        package('COM.GUI.Interfaces.HolderInterface')
    );

    package('COM.GUI.Container.ToolBar', ToolBar);

})();
