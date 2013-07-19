describe("COM.GUI.Form.Text", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    function setup() {
        return new (package('COM.GUI.Form.Text'))();
    }

    it("init", function() {
        var field = setup();

        assert.equals(
            field.$Text_Element.attr('type'),
            'text'
        );
    });

});