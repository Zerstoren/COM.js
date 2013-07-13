(function() {

    var Cell = function(cfg) {
        this.init(cfg);
    };

    Cell.prototype.$super = 'Cell';

    Cell.prototype.init = function(cfg) {
        this.$Cell_Config = Object.merge({
            span: 12,
            content: '',
            height: 'auto',
            align: 'left',
            valign: 'middle'
        }, cfg || {});

        this.$Cell_ParentRow = null;
        this.$Cell_Index = null;
        this.$Cell_Element = null;

        this.$Cell_CreateElement();
    };

    Cell.prototype.getCell = function() {
        return this.$Cell_Element;
    };

    Cell.prototype.getContent = function() {
        return this.$Cell_Config.content;
    };

    Cell.prototype.setContent = function(content) {
        if(typeof content === 'string') {
            this.$Cell_Element.html(content);
        } else if(
            content instanceof Object &&
            content.hasInterface('COM.GUI.Interfaces.RenderInterface') &&
            content.hasInterface('COM.GUI.Interfaces.HolderInterface')
        ) {
            content.setHolder(this.$Cell_Element);
            content.render();
        }

        this.$Cell_Config.content = content;
    };

    Cell.prototype.getSpan = function() {
        return this.$Cell_Config.span;
    };

    Cell.prototype.setSpan = function(spanSize) {
        this.$Cell_Element.removeClass('span' + this.$Cell_Config.span);
        this.$Cell_Config.span = spanSize;
        this.$Cell_Element.addClass('span' + spanSize);
    };

    Cell.prototype.getHeight = function() {
        return this.$Cell_Config.height;
    };

    Cell.prototype.setHeight = function(height) {
        this.$Cell_Element.css({height: height});
        this.$Cell_Config.height = height;
    };

    Cell.prototype.getAlign = function() {
        return this.$Cell_Config.align;
    };

    Cell.prototype.setAlign = function(align) {
        this.$Cell_Element.css({textAlign: align});
        this.$Cell_Config.align = align;
    };

    Cell.prototype.getValign = function() {
        return this.$Cell_Config.valign;
    };

    Cell.prototype.setValign = function(valign) {
        this.$Cell_Element.css({verticalAlign: valign});
        this.$Cell_Config.valign = valign;
    };

    Cell.prototype.appendToRow = function(row, index) {
        if(this.$Cell_ParentRow !== null) {
            throw new Error('Cell already added to row');
        }

        if(!row.hasInterface('COM.GUI.Interfaces.RowInterface')) {
            throw new Error('You try added cell not to Row class');
        }

        this.$Cell_ParentRow = row;
        this.$Cell_Index = index;
    };

    Cell.prototype.$Cell_CreateElement = function() {
        this.$Cell_Element = $('<div>');
        this.$Cell_Element.css('display', 'table-cell');

        this.setSpan(this.$Cell_Config.span);
        this.setContent(this.$Cell_Config.content);
        this.setHeight(this.$Cell_Config.height);
        this.setAlign(this.$Cell_Config.align);
        this.setValign(this.$Cell_Config.valign);
    };

    Object.interface(
        Cell,
        package('COM.Extend'),
        package('COM.GUI.Interfaces.CellInterface')
    );

    package('COM.GUI.Grid.Cell', Cell);

})();
