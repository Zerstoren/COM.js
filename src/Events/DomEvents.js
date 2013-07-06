(function() {
    /**
     * Данный набор объектов, служит прослойкой для воздействия и подписки над
     * обычными jquery событиями. В добавок, есть возможность устанавливать обработчики
     * из приходящих конфигов в классе-родителе
     * @type {Object}
     */
    var Dom = {};

    Dom.$super = 'DomEvents';

    Dom.init = function(element, config) {
        var ev,
            $ = packeg('$');

        this.$DomEvents_Element = $(element);

        this.$DomEvents_EventsDict = {
            // Mouse Events
            onClick: this.$DomEvents_Element.click.bind(this.$DomEvents_Element),
            onDoubleClick: this.$DomEvents_Element.dblclick.bind(this.$DomEvents_Element),
            onHover: this.$DomEvents_Element.hover.bind(this.$DomEvents_Element),
            onMouseDown: this.$DomEvents_Element.mousedown.bind(this.$DomEvents_Element),
            onMouseUp: this.$DomEvents_Element.mouseup.bind(this.$DomEvents_Element),
            onMouseEnter: this.$DomEvents_Element.mouseenter.bind(this.$DomEvents_Element),
            onMouseLeave: this.$DomEvents_Element.mouseleave.bind(this.$DomEvents_Element),
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
            on: this.$DomEvents_Element.on.bind(this.$DomEvents_Element),
            off: this.$DomEvents_Element.off.bind(this.$DomEvents_Element),
            unbind: this.$DomEvents_Element.unbind.bind(this.$DomEvents_Element)
        };

        if(!this.$super) {
            throw new Error('For DomEvents COM.Extend is required packeg');
        }

        for(ev in this.$DomEvents_EventsDict) {
            this.add_new_method(
                ev,
                this.$DomEvents_EventsDict[ev],
                Dom.$super
            );
        }

        this.domEventsRegister(config);
    };

    Dom.domEventsRegister = function(config) {
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

    packeg('COM.Events.DomEvents', Dom);

})();