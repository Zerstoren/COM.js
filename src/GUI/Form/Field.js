(function() {

    var Field = function() {

    };

    Field.prototype.$super = 'Field';

    Field.prototype.init = function() {

    };

    Field.prototype.getValue = function() {

    };

    Field.prototype.setValue = function() {

    };

    Field.prototype.validate = function(type) {

    };

    Object.extend(
        Field,
        packeg('COM.Extend'),
        packeg('COM.GUI.Base.Element').prototype,
        packeg('COM.Events.DomEvents')
    );

    packeg('COM.GUI.Form.Field', Field);

})();
