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
    DataMapperInterface.clear = 0;
    DataMapperInterface.getElements = 0;

    package('COM.GUI.Interfaces.DataMapperInterface', DataMapperInterface);

})();
