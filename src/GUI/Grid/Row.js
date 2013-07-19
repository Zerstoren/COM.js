(function() {

    //var CellMapper = new (package('COM.GUI.'))

    var Row = function(cfg) {

    };

    Object.interface(
        Row,
        package('COM.GUI.Interfaces.RowInterface')
    );

    package('COM.GUI.Grid.Row', Row);

})();
