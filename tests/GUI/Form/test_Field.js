describe("COM.GUI.Form.Field", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    function setup() {
        var $ = package('$');
        var Field2 = function(cfg) {
            this.init(cfg);
        };
        Field2.prototype.$super = 'Field2';
        Field2.prototype.$Field_CreateElement = function() {
            var $ = package('$');
            this.$Text_Element = $('<input>');
            return this.$Text_Element
                .attr('type', 'text');
        };

        Object.extend(
            Field2,
            package('COM.GUI.Form.Field').prototype
        );

        return {
            Field: Field2,
            holder: $('#holder')
        };
    }

    function create(data) {
        return new data.Field({
            holder: data.holder
        });
    }

    it("init", function() {
        var data = setup();
        var field = new data.Field({
            value: 'testValue',
            placeholder: 'testPlaceholder'
        });

        assert.equals(
            field.$Field_Element.val(),
            'testValue'
        );

        assert.equals(
            field.$Field_Element.attr('placeholder'),
            'testPlaceholder'
        );
    });

    it("getValue && setValue", function() {
        var field = create(setup());
        assert.equals(
            field.getValue(),
            ''
        );

        field.setValue('testValue');

        assert.equals(
            field.getValue(),
            'testValue'
        );

        field.setValue('');

        assert.equals(
            field.getValue(),
            ''
        );
    });

    it("setPlaceholder", function() {
        var field = create(setup());

        assert.equals(
            field.$Field_Element.attr('placeholder'),
            undefined
        );

        field.setPlaceholder('testPlaceholder');
        assert.equals(
            field.$Field_Element.attr('placeholder'),
            'testPlaceholder'
        );


        field.setPlaceholder('');
        assert.equals(
            field.$Field_Element.attr('placeholder'),
            ''
        );
    });

    it("disable && enable", function() {
        var field = create(setup());

        assert.equals(
            field.$Field_Element.attr('disabled'),
            undefined
        );

        field.disable();
        assert.equals(
            field.$Field_Element.attr('disabled'),
            'disabled'
        );

        field.enable();
        assert.equals(
            field.$Field_Element.attr('disabled'),
            undefined
        );
    });

    it("validate->Required", function() {
        var field = create(setup());

        assert.isFalse(field.validate('Required'));

        field.setValue('Test');
        assert.isTrue(field.validate('Required'));

        field.setValue('');
        assert.isFalse(field.validate('Required'));

        field.setValue('0');
        assert.isTrue(field.validate('Required'));

        field.setValue(0);
        assert.isTrue(field.validate('Required'));

        field.setValue(false);
        assert.isTrue(field.validate('Required'));

        field.setValue();
        assert.isFalse(field.validate('Required'));
    });

    it("validate->Pattern", function() {
        var field = create(setup());
        var pattern = '^[a-z]+$';

        assert.isFalse(field.validate('Pattern', pattern));

        field.setValue('Test');
        assert.isFalse(field.validate('Pattern', pattern));

        field.setValue('');
        assert.isFalse(field.validate('Pattern', pattern));

        field.setValue('0');
        assert.isFalse(field.validate('Pattern', pattern));

        field.setValue('true');
        assert.isTrue(field.validate('Pattern', pattern));

        field.setValue(false);
        assert.isTrue(field.validate('Pattern', pattern));

        field.setValue();
        assert.isFalse(field.validate('Pattern', pattern));
    });

    it("validate->Match", function() {
        var field = create(setup());
        var field2 = create(setup());

        assert.isTrue(field.validate('Match', field2));

        field2.setValue('Test');
        assert.isFalse(field.validate('Match', field2));

        field.setValue('Test');
        assert.isTrue(field.validate('Match', field2));

        field.setValue('test');
        assert.isFalse(field.validate('Match', field2));
    });
});