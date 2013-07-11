(function() {
    /**
     * Создает поле для ввода пароля
     *
     * @package COM.GUI.Form.Password
     */
    var Password = function(cfg) {
        this.init(cfg);
    };

    Password.prototype.$super = 'Password';

    Password.prototype.init = function(cfg) {
        this.$Password_Config = Object.merge({
            value: '',
            class: 'field-password'
        }, cfg || {});

        this.super('Field', 'init', [this.$Password_Config]);
    };

    Password.prototype.$Field_CreateElement = function() {
        var $ = packeg('$');
        this.$Password_Element = $('<input>');
        return this.$Password_Element
            .attr('type', 'password')
            .val(this.$Password_Config.value);
    };

    Object.extend(
        Password,
        packeg('COM.GUI.Form.Field').prototype
    );

    packeg('COM.GUI.Form.Password', Password);

})();
