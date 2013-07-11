(function() {
    /**
     * @interface RenderInterface
     *
     * Интерфейс для реализации системы отрисовки
     */
    var RenderInterface = {};

    RenderInterface.$interface = 'RenderInterface';

    RenderInterface.render = 0;
    RenderInterface.clean = 0;

    packeg('COM.GUI.Interfaces.RenderInterface', RenderInterface);
})();
