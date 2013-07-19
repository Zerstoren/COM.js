describe("COM.GUI.Form.Password", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    function setup() {
        return new (package('COM.GUI.Form.Password'))();
    }

    it("init", function() {
        var field = setup();

        assert.equals(
            field.$Password_Element.attr('type'),
            'password'
        );
    });

});