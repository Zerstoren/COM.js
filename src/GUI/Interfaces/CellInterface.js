(function() {

    var CellInterface = {};

    CellInterface.$interface = 'CellInterface';

    CellInterface.getCell = 0;

    CellInterface.setContent = 1;
    CellInterface.setSpan = 1;
    CellInterface.setHeight = 1;
    CellInterface.setAlign = 1;
    CellInterface.setValign = 1;

    CellInterface.appendToRow = 2;

    package('COM.GUI.Interfaces.CellInterface', CellInterface);

})();
