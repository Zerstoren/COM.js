(function() {
    /**
     * @interface HolderInterface
     *
     * Интерфейс для управления холдерами
     */
    var HolderInterface = {};
    HolderInterface.$interface = 'HolderInterface';

    HolderInterface.move = 1;
    HolderInterface.setHolder = 1;

    packeg('COM.GUI.Interfaces.HolderInterface', HolderInterface);

})();
