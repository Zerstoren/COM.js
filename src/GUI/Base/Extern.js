(function() {

    var Extern = function() {
        throw new Error('Not for create, use prototype');
    };

    Extern.prototype.$super = 'Extern';

    /**
     * Устанавливает все классы и id из настроек, на элемент, с которым происходят действия
     * @protected
     * @return {void}
     */
    Extern.prototype._SetDefaultRenderInfo = function(dom, config) {
        if(config.useWrapper && config.identifyWrapper) {
            dom.addClass(config.identifyWrapper);
        }

        if(config.class) {
            dom.addClass(config.class);
        }

        if(config.extraClass) {
            dom.addClass(config.extraClass);
        }

        if(config.id) {
            dom.attr('id', config.id);
        }
    };

    /**
     * Удаляет все классы и id из настроек, на элемент, с которым происходят действия
     * @protected
     * @return {void}
     */
    Extern.prototype._RemoveDefaultRenderInfo = function() {
        if(this.config.useWrapper && this.config.identifyWrapper) {
            dom.removeClass(this.config.identifyWrapper);
        }

        if(this.config.class) {
            dom.removeClass(this.config.class);
        }

        if(this.config.extraClass) {
            dom.removeClass(this.config.extraClass);
        }

        if(this.config.id) {
            dom.removeAttr('id');
        }
    };

    packeg('COM.GUI.Base.Extern', Extern);

})();