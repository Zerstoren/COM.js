(function() {
    /**
     * @interface DataMapperInterface
     *
     * Интерфейс для обджект маппера
     */
    var DataMapperInterface = {};
    DataMapperInterface.$interface = 'DataMapperInterface';

    DataMapperInterface.push = 1;
    DataMapperInterface.remove = 1;

    packeg('COM.GUI.Interfaces.DataMapperInterface', DataMapperInterface);

})();
