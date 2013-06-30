(function() {
    /**
     * Данный набор объектов, служит прослойкой для воздействия и подписки над
     * обычными jquery событиями. В добавок, есть возможность устанавливать обработчики
     * из приходящих конфигов в классе-родителе
     * @type {Object}
     */
    var Dom = {};

    Dom.$super = 'DomEvents';

    Dom.init = function(element, config, isFormELement) {
        var $ = packeg('$');

        this.$DomEvents_Element = $(element);

        this.$DomEvents_EventsDict = {
            // Mouse Events
            onClick: this.$DomEvents_Element.click,
            onDoubleClick: this.$DomEvents_Element.dblclick,
            onHover: this.$DomEvents_Element.hover,
            onMouseDown: this.$DomEvents_Element.mousedown,
            onMouseUp: this.$DomEvents_Element.mouseup,
            onMouseEnter: this.$DomEvents_Element.mouseenter,
            onMouselEave: this.$DomEvents_Element.mouseleave,
            onMouseMove: this.$DomEvents_Element.mousemove,

            // input and forms events
            onFocus: this.$DomEvents_Element.focus,
            onBlur: this.$DomEvents_Element.blur,
            onFocusIn: this.$DomEvents_Element.focusin,
            onFocusOut: this.$DomEvents_Element.focusout,
            onSelect: this.$DomEvents_Element.select,
            onSubmit: this.$DomEvents_Element.submit,
            onChange: this.$DomEvents_Element.change,

            // low level events
            on: this.$DomEvents_Element.on,
            off: this.$DomEvents_Element.off,
            unbind: this.$DomEvents_Element.unbind
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
    }

    Dom.domEventsRegister = function(config) {
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