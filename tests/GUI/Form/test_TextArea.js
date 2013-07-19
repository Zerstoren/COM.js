describe("COM.GUI.Form.TextArea", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    function setup() {
        return new (package('COM.GUI.Form.TextArea'))();
    }

    it("init", function() {
        var field = setup();

        assert.equals(
            field.$TextArea_Element[0].tagName,
            'TEXTAREA'
        );
    });
});