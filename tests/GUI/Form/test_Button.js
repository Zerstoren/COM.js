describe("COM.GUI.Form.Button", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    var Button = package('COM.GUI.Form.Button');

    function setup() {
        var holder = jQuery('#holder');

        var button = new Button({
            holder: holder,
            value: 'button',
            id: button
        });

        return {
            holder: holder,
            button: button
        };
    }

    it("init", function() {
        var data = setup();
        assert.equals(
            data.button.$Button_Element.html(),
            'button'
        );
    });

    it("setText", function() {
        var data = setup();
        data.button.render();
        assert.equals(
            data.button.$Button_Element.html(),
            'button'
        );

        var elem = new (package('COM.GUI.Base.Element'))({
            element: '<span>',
            content: 'some text'
        });

        data.button.setText('more');
        assert.equals(
            data.button.$Button_Element.html(),
            'more'
        );

        data.button.setText(elem);
        assert.equals(
            data.button.$Button_Element.html(),
            '<span>some text</span>'
        );

        data.button.setText();
        assert.equals(
            data.button.$Button_Element.html(),
            ''
        );
    });
});
