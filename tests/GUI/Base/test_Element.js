describe("COM.GUI.Base.Element", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    var Element = package('COM.GUI.Base.Element');

    function setup() {
        var holder = jQuery('#holder');
        var element = jQuery('<span>');
        element.html('test');

        var item = new Element({
            id: 'id',
            class: 'class',
            extractClass: 'class1 class2',
            holder: holder,
            element: element,
            visible: true
        });

        return {
            element: element,
            holder: holder,
            item: item
        };
    }

    it("init", function() {
        var holder = jQuery('#holder');
        var element = jQuery('<span>test<span>');

        var item = new Element({
            id: 'id',
            class: 'class',
            extractClass: 'class1 class2',
            holder: holder,
            element: element,
            visible: false
        });

        assert.sameJquery(item.$Element_Holder, holder);
        assert.sameJquery(item.$Element_Element, element);

        assert.isTrue(element.hasClass('class'));
        assert.isTrue(element.hasClass('class1'));
        assert.isTrue(element.hasClass('class2'));
        assert.equals(element.attr('id'), 'id');
        assert.equals(element.css('display'), 'none');
    });

    it("interfaces", function() {
        var data = setup();

        assert.isTrue(data.item.hasInterface('COM.GUI.Interfaces.HolderInterface'));
        assert.isTrue(data.item.hasInterface('COM.GUI.Interfaces.RenderInterface'));
    });

    it("render && clean", function() {
        var data = setup();
        refute.elementExists('#holder > #id');

        data.item.render();
        assert.elementExists('#holder > #id');

        data.item.clean();
        refute.elementExists('#holder > #id');
    });

    it('show && hide', function() {
        var data = setup();
        data.item.render();

        assert.equals(data.element.css('display'), 'inline');

        data.item.hide();
        assert.equals(data.element.css('display'), 'none');

        data.item.show();
        assert.equals(data.element.css('display'), 'inline');
    });

    it('getHolder', function() {
        var data = setup();
        assert.sameJquery(
            data.item.getHolder(),
            data.holder
        );
    });

    it('setHolder', function() {
        var data = setup();
        data.holder.append(jQuery('<span id="child">'));

        data.item.render();

        assert.elementExists('#holder > #id');

        data.item.setHolder('#child');
        refute.elementExists('#holder > #id');

        data.item.render();
        assert.elementExists('#child > #id');
    });

    it('move', function() {
        var data = setup();
        data.holder.append(jQuery('<span id="child">'));

        data.item.render();

        assert.elementExists('#holder > #id');

        data.item.move('#child');
        refute.elementExists('#holder > #id');
        assert.elementExists('#child > #id');
    });
});