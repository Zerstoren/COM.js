(function() {

    var Grid = function(cfg) {
        this.init(cfg);
    };

    Grid.prototype.init = function(cfg) {
        this.$Grid_Config = Object.merge({
            rows: [],
            header: null,
            footer: null,
            caption: null,
            class: 'table'
        }, cfg || {});

        this.$Grid_Element = null;
        this.$Grid_TableHead = null;
        this.$Grid_TableFooter = null;
        this.$Grid_TableBody = null;
        this.$Grid_Caption = null;

        this.$Grid_CreateElement();
        this.$Grid_Config.element = this.$Grid_Element;

        if(this.$Grid_Config.header) {
            this.setHeader(this.$Grid_Config.header);
        }

        if(this.$Grid_Config.caption) {
            this.setCaption(this.$Grid_Config.caption);
        }

        for(var i = 0, max = this.$Grid_Config.rows.length; i < max; i++) {
            this.push(this.$Grid_Config.rows[i]);
        }

        if(this.$Grid_Config.footer) {
            this.setFooter(this.$Grid_Config.footer);
        }

        this.super('Element', 'init', [this.$Grid_Config]);
    };

    Grid.prototype.push = function(row) {
        if(!row.hasInterface('COM.GUI.Interfaces.RowInterface')) {
            throw new Error('Added row, dont have RowInterface');
        }

        this.$Grid_TableBody.append(row.getRow());
    };

    Grid.prototype.remove = function(row) {
        if(!Array.contain(this.$Grid_Config.rows, row)) {
            throw new Error('Current row can`t be remove from grid, because is not contain in grid');
        }
    };

    Grid.prototype.setCaption = function(caption) {
        var $ = package('$');

        if(this.$Grid_Caption === null) {
            this.$Grid_Caption = $('<caption>');
            this.$Grid_Element.prepend(this.$Grid_Caption);
        };

        if(typeof caption === 'string') {
            var span = $('<span>');
            span.html(caption);

            caption = new (package('COM.GUI.Base.Element'))({
                element: span
            });

            this.$Grid_Config.caption = caption;
        }

        if(
            !caption.hasInterface('COM.GUI.Interfaces.HolderInterface') ||
            !caption.hasInterface('COM.GUI.Interfaces.RenderInterface')
        ) {
            throw new Error('You try add caption without HolderInterface or RenderInterface');
        }

        caption
            .setHolder(this.$Grid_Caption)
            .render();
    };

    Grid.prototype.removeCaption = function() {
        if(this.$Grid_Caption === null) {
            throw new Error('Caption is not created');
        }

        this.$Grid_Caption.detach();
        this.$Grid_Caption = null;
    };

    Grid.prototype.setHeader = function(header) {
        var $ = package('$');
        if(!header.hasInterface('COM.GUI.Interfaces.RowInterface')) {
            throw new Error('You try added row to header grid without RowInterface');
        }

        if(this.$Grid_TableHead === null) {
            this.$Grid_TableHead = $('<thead>');
            this.$Grid_TableHead.addClass('table-head');
            this.$Grid_Element.prepend(this.$Grid_TableHead);
        } else {
            this.$Grid_Config.header.getRow().detach();
        }

        this.$Grid_TableHead.append(header.getRow());
        this.$Grid_Config.header = header;
    };

    Grid.prototype.removeHeader = function() {
        if(this.$Grid_TableHead === null) {
            throw new Error('Table header is not created');
        }

        this.$Grid_TableHead.detach();
        this.$Grid_TableHead = null;
    };

    Grid.prototype.setFooter = function(footer) {
        var $ = package('$');

        if(!footer.hasInterface('COM.GUI.Interfaces.RowInterface')) {
            throw new Error('You try added row to footer grid without RowInterface');
        }

        if(this.$Grid_TableFooter === null) {
            this.$Grid_TableFooter = $('<tfoot>');
            this.$Grid_TableFooter.addClass('table-footer');
            this.$Grid_Element.append(this.$Grid_TableFooter);
        } else {
            this.$Grid_Config.footer.getRow().detach();
        }

        this.$Grid_TableFooter.append(footer.getRow());
        this.$Grid_Config.footer = footer;
    };

    Grid.prototype.removeFooter = function() {
        if(this.$Grid_TableFooter === null) {
            throw new Error('Table footer is not created');
        }

        this.$Grid_TableFooter.detach();
        this.$Grid_TableFooter = null;
    }

    Grid.prototype.$Grid_CreateElement = function() {
        var $ = package('$');
        this.$Grid_Element = $('<table>');

        this.$Grid_TableBody = $('<tbody>');
        this.$Grid_TableBody.addClass('table-body');
        this.$Grid_Element.append(this.$Grid_TableBody);
    };


    Object.extend(
        Grid,
        package('COM.GUI.Base.Element').prototype
    );

    package('COM.GUI.Grid.Grid', Grid);

})();
