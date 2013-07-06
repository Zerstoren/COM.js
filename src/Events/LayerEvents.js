(function() {

    var LayerEvents = {};

    LayerEvents.$super = 'LayerEvents';

    LayerEvents.init = function() {
        this.$LayerEvents_EventsList = {
            'onClick': [],
            'onDoubleClick': [],
            'onMouseDown': [],
            'onMouseUp': [],
            'onMouseEnter': [],
            'onMouseLeave': [],
            'onMouseMove': []
        };

        this.$LayerEvents_OnMouseEntered = [];
    };

    LayerEvents.attach = function(type, figure) {
        var sum;

        if(this.$LayerEvents_EventsList[type] === undefined) {
            throw new Error('Undefined event ' + type);
        }

        if(type === 'onMouseEnter' || type === 'onMouseLeave' || type === 'onMouseMove') {
            sum = this.$LayerEvents_EventsList['onMouseEnter'].length +
                  this.$LayerEvents_EventsList['onMouseLeave'].length +
                  this.$LayerEvents_EventsList['onMouseMove'].length;

            if(sum === 0) {
                this.onMouseMove(this.$LayerEvents_ProcessingEventMove.bind(this));
            }
        } else if(this.$LayerEvents_EventsList[type].length === 0) {
            this[type](this.$LayerEvents_ProcessingEvent.bind(this, type));
        }

        this.$LayerEvents_EventsList[type].push(figure.$Layer_name);
    };

    LayerEvents.detach = function(type, figure) {
        if(this.$LayerEvents_EventsList[type] === undefined) {
            throw new Error('Undefined event ' + type);
        }

        if(this.$LayerEvents_EventsList[type].length === 0) {
            throw new Error('Figure is not subscribe on this event');
        }

        if(type === 'onMouseEnter' || type === 'onMouseLeave' || type === 'onMouseMove') {
            sum = this.$LayerEvents_EventsList['onMouseEnter'].length +
                  this.$LayerEvents_EventsList['onMouseLeave'].length +
                  this.$LayerEvents_EventsList['onMouseMove'].length;

            if(sum === 1) {
                this.unbind('onMouseMove', this.$LayerEvents_ProcessingEventMove.bind(this));
            }
        } else if(this.$LayerEvents_EventsList[type].length === 1) {
            this.unbind(alias, this.$LayerEvents_ProcessingEvent.bind(this, type));
        }

        Array.remove(this.$LayerEvents_EventsList[type], figure.$Layer_name);
    };

    LayerEvents.$LayerEvents_ProcessingEvent = function(type, ev) {
        var figures, figure, i;
        figures = this.$LayerEvents_ZoneIn(type, ev);

        for(i = figures.length; i--;) {
            figure = figures[i];

            if(figure.hasEvent(type)) {
                figure.fireEvent(type, ev);
            }
        }
    };

    LayerEvents.$LayerEvents_ProcessingEventMove = function(ev) {
        var figures, figure;

        if(this.$LayerEvents_EventsList['onMouseEnter'].length) {
            figures = this.$LayerEvents_ZoneIn('onMouseEnter', ev);

            for(i = figures.length; i--;) {
                figure = figures[i];

                if(figure.$LayerEvents_OnEnter === true) {
                    continue;
                }

                figure.$LayerEvents_OnEnter = true;
                this.$LayerEvents_OnMouseEntered.push(figures[i].$Layer_name);

                if(figure.hasEvent('onMouseEnter')) {
                    figure.fireEvent('onMouseEnter', ev);
                }
            }
        }

        if(this.$LayerEvents_EventsList['onMouseLeave'].length) {
            figures = this.$LayerEvents_ZoneOut('onMouseEnter', ev);

            for(i = figures.length; i--;) {
                figure = figures[i];

                if(figure.$LayerEvents_OnEnter === undefined) {
                    continue;
                }

                delete figure.$LayerEvents_OnEnter;
                Array.remove(this.$LayerEvents_OnMouseEntered, figures[i].$Layer_name);

                if(figure.hasEvent('onMouseLeave')) {
                    figure.fireEvent('onMouseLeave', ev);
                }
            }
        }

        if(this.$LayerEvents_OnMouseEntered.length) {
            figures = this.$LayerEvents_ZoneOut('onMouseEnter', ev, this.$LayerEvents_OnMouseEntered);

            for(i = figures.length; i--;) {
                figure = figures[i];

                if(figure.$LayerEvents_OnEnter === undefined) {
                    continue;
                }

                delete figure.$LayerEvents_OnEnter;
                Array.remove(this.$LayerEvents_OnMouseEntered, figures[i].$Layer_name);
            }
        }

        if(this.$LayerEvents_EventsList['onMouseMove'].length) {
            figures = this.$LayerEvents_ZoneIn('onMouseMove', ev);

            for(i = figures.length; i--;) {
                figure = figures[i];

                if(figure.hasEvent('onMouseMove')) {
                    figure.fireEvent('onMouseMove', ev);
                }
            }
        }
    };

    LayerEvents.$LayerEvents_ZoneIn = function(type, ev, block) {
        var i, figure,
            entered = [],
            block = block ? block : this.$LayerEvents_EventsList[type];

        for(i = block.length; i--;) {
            figure = this.getFigure(block[i]);

            if(
                ev.offsetX >= figure.position.x && ev.offsetX <= figure.position.x + figure.size.width &&
                ev.offsetY >= figure.position.y && ev.offsetY <= figure.position.y + figure.size.height
            ) {
                entered.push(figure);
            }
        }

        return entered;
    };

    LayerEvents.$LayerEvents_ZoneOut = function(type, ev, block) {
        var i,
            entered = [],
            figure = [],
            block = block ? block : this.$LayerEvents_EventsList[type];

        for(i = block.length; i--;) {
            figure = this.getFigure(block[i]);
            if(!(
                ev.offsetX >= figure.position.x && ev.offsetX <= figure.position.x + figure.size.width &&
                ev.offsetY >= figure.position.y && ev.offsetY <= figure.position.y + figure.size.height
            )) {
                entered.push(figure);
            }
        }

        return entered;
    };

    packeg('COM.Events.LayerEvents', LayerEvents);

})();
