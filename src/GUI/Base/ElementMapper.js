(function() {
    /**
     * Шаблон проектирования Composite, позволяет производить действия над группами элементов
     * которые имеют интерфейсы RenderInterface и HolderInterface. Так-же может включать
     * в себя любые элементы, которые имеют общий интерфейс
     *
     * В то-же время сам Mapper имплементирует эти интерфейсы и может
     * использоваться как отдельный элемент.
     *
     * @package COM.GUI.Base.ElementMapper
     */
    var ElementMapper = function() {
        this.init();
    };

    ElementMapper.prototype.init = function() {
        this.$ElementMapper_Mapped = [];
    };

    /**
     * Добавляет новый итем в маппер
     * @param  {object} item Итем с парой интерфейсов
     * @return {this}
     */
    ElementMapper.prototype.push = function(item) {
        if(
            !item.hasInterface('COM.GUI.Interfaces.RenderInterface') ||
            !item.hasInterface('COM.GUI.Interfaces.HolderInterface')
        ) {
            throw new Error('Pushed element dont have interfaces: RenderInterface or HolderInterface');
        }

        this.$ElementMapper_Mapped.push(item);

        return this;
    };

    /**
     * Удаляет итем из маппера
     * @param  {object} item Итем, который уже добавлялся в маппер
     * @return {this}
     */
    ElementMapper.prototype.remove = function(item) {
        Array.remove(this.$ElementMapper_Mapped, item);
        return this;
    };

    /**
     * Remove all mapped elements
     * @return {this}
     */
    ElementMapper.prototype.clear = function() {
        this.$ElementMapper_Mapped = [];
        return this;
    };

    /**
     * Вызывает render
     * @return {this}
     */
    ElementMapper.prototype.render = function() {
        this.$ElementMapper_Map('render', []);
        return this;
    };

    /**
     * Вызывает clean
     * @return {this}
     */
    ElementMapper.prototype.clean = function() {
        this.$ElementMapper_Map('clean', []);
        return this;
    };

    /**
     * Вызывает move
     * @return {this}
     */
    ElementMapper.prototype.move = function(holder) {
        this.$ElementMapper_Map('move', [holder]);
        return this;
    };

    /**
     * Вызывает setHolder
     * @return {this}
     */
    ElementMapper.prototype.setHolder = function(holder) {
        this.$ElementMapper_Map('setHolder', [holder]);
        return this;
    };

    ElementMapper.prototype.$ElementMapper_Map = function(fnName, args) {
        var i, max;
        for(i = 0, max = this.$ElementMapper_Mapped.length; i < max; i++) {
            this.$ElementMapper_Mapped[i][fnName].apply(this.$ElementMapper_Mapped[i], args);
        }
    };

    ElementMapper.prototype.getElements = function() {
        return this.$ElementMapper_Mapped;
    };

    ElementMapper.prototype.getElement = function(n) {
        var item = this.$ElementMapper_Mapped[n];
        if(item === undefined) {
            throw new Error('Out of range');
        }

        return item;
    };

    Object.extend(
        ElementMapper,
        package('COM.Extend')
    );

    Object.interface(
        ElementMapper,
        package('COM.GUI.Interfaces.DataMapperInterface'),
        package('COM.GUI.Interfaces.RenderInterface'),
        package('COM.GUI.Interfaces.HolderInterface')
    );

    package('COM.GUI.Base.ElementMapper', ElementMapper);
})();
