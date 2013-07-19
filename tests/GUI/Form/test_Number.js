describe("COM.GUI.Form.Number", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    function setup(cfg) {
        return new (package('COM.GUI.Form.Number'))(cfg || {});
    }

    it("init", function() {
        var field = new setup({
            value: 5,
            min: 0,
            max: 25,
            step: 5
        });

        assert.equals(
            field.$Number_Element.attr('min'),
            '0'
        );

        assert.equals(
            field.$Number_Element.attr('max'),
            '25'
        );

        assert.equals(
            field.$Number_Element.attr('step'),
            '5'
        );

        assert.equals(
            field.getValue(),
            '5'
        );
    });

});