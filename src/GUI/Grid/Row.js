(function() {

    var Row = function(cfg) {
        this.init(cfg);
    };

    Row.prototype.$super = 'Row';

    Row.prototype.init = function(cfg) {
        this.$Row_Config = Object.merge({
            height: 'auto',
            cells: []
        }, cfg || {});

        this.$Row_Cells = {};
        this.$Row_Element = null;

        this.$Row_CreateElement();

        for(var i = 0, max = this.$Row_Config.cells.length; i < max; i++) {
            this.push(this.$Row_Config.cells[i]);
        }
    };

    Row.prototype.getRow = function() {
        return this.$Row_Element;
    };

    Row.prototype.push = function(cell) {
        var index = Number.uniqueId('cell-');

        if(typeof cell === 'string') {
            cell = new (package('COM.GUI.Grid.Cell'))({
                content:  cell
            });
        }

        if(!cell.hasInterface('COM.GUI.Interfaces.CellInterface')) {
            throw new Error('You try added cell without CellInterface');
        }

        this.$Row_Cells[index] = cell;
        cell.appendToRow(this, index);

        this.$Row_Element.append(cell.getCell());
    };

    Row.prototype.remove = function(index) {
        if(this.$Row_Cells[index] === undefined) {
            throw new Error('Undefined cell index in row');
        }

        this.$Row_Cells[index].detach();
        delete this.$Row_Cells[index];
    };

    Row.prototype.getHeight = function() {
        return this.$Row_Config.height;
    };

    Row.prototype.setHeight = function(height) {
        this.$Row_Config.height = height;
    };

    Row.prototype.$Row_CreateElement = function() {
        var $ = package('$');
        this.$Row_Element = $('<tr>');
        this.$Row_Element.addClass('table-row');
    };

    Object.extend(
        Row,
        package('COM.Extend')
    )

    Object.interface(
        Row,
        package('COM.GUI.Interfaces.RowInterface')
    );

    package('COM.GUI.Grid.Row', Row);

})();
