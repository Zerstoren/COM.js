(function() {
    /**
     * Данный набор объектов, служит прослойкой для воздействия и подписки над
     * обычными jquery событиями. В добавок, есть возможность устанавливать обработчики
     * из приходящих конфигов в классе-родителе
     * @type {Object}
     */
    var DomEvents = {};

    DomEvents.$super = 'DomEvents';

    DomEvents.init = function(element, config, isFormELement) {
        var ev;

        if(!this.$super) {
            throw new Error('this.$super is undefined and need be setup');
        }

        this.setEventsElement(element);

        this.$DomEvents_EventsDict = {
            // Mouse Events
            onClick: this.$DomEvents_Element.click.bind(this.$DomEvents_Element),
            onDoubleClick: this.$DomEvents_Element.dblclick.bind(this.$DomEvents_Element),
            onHover: this.$DomEvents_Element.hover.bind(this.$DomEvents_Element),
            onMouseDown: this.$DomEvents_Element.mousedown.bind(this.$DomEvents_Element),
            onMouseUp: this.$DomEvents_Element.mouseup.bind(this.$DomEvents_Element),
            onMouseEnter: this.$DomEvents_Element.mouseenter.bind(this.$DomEvents_Element),
            onMouselEave: this.$DomEvents_Element.mouseleave.bind(this.$DomEvents_Element),
            onMouseMove: this.$DomEvents_Element.mousemove.bind(this.$DomEvents_Element),

            // input and forms events
            onFocus: this.$DomEvents_Element.focus.bind(this.$DomEvents_Element),
            onBlur: this.$DomEvents_Element.blur.bind(this.$DomEvents_Element),
            onFocusIn: this.$DomEvents_Element.focusin.bind(this.$DomEvents_Element),
            onFocusOut: this.$DomEvents_Element.focusout.bind(this.$DomEvents_Element),
            onSelect: this.$DomEvents_Element.select.bind(this.$DomEvents_Element),
            onSubmit: this.$DomEvents_Element.submit.bind(this.$DomEvents_Element),
            onChange: this.$DomEvents_Element.change.bind(this.$DomEvents_Element),

            // low level events
            on: this.$DomEvents_Element.on,
            off: this.$DomEvents_Element.off,
            unbind: this.$DomEvents_Element.unbind
        };

        for(ev in this.$DomEvents_EventsDict) {
            this.add_new_method(
                ev,
                this.$DomEvents_EventsDict[ev],
                DomEvents.$super
            );
        }

        this.$DomEvents_DomEventsRegister(config);
    };

    DomEvents.setEventsElement = function(element) {
        var $ = package('$');
        this.$DomEvents_Element = $(element);
    };

    DomEvents.$DomEvents_DomEventsRegister = function(config) {
        var item;

        if(!config) {
            return;
        }

        for(item in config) {
            if(item === 'on' || item === 'off' || item === 'unbind') {
                continue;
            }

            if(this.$DomEvents_EventsDict[item] !== undefined) {
                this.$DomEvents_EventsDict[item].apply(
                    this.$DomEvents_Element,
                    [config[item]]
                );
            }
        }
    };

    package('COM.Events.DomEvents', DomEvents);

})();