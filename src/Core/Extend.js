/**
 * COM.Core.Extend
 *
 * Данный метод позволяет автоматически вызвать все родительские иницилизаторы
 */
(function() {
    var Extend = {};

    /**
     * Вызывает все родитильские иницилизаторы
     * @return {void}
     */
    Extend.extend = function() {
        for(var i = 0; i < this.__$$parent.length; i++) {
            this.__$$parent();
        }
    };

    packeg('COM.Extend', Extend);
})();
