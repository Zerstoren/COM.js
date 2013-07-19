describe("COM.GUI.Base.ElementMapper", function() {
    buster.spec.before(createHolder);
    buster.spec.after(removeHolder);

    var Mapper = package('COM.GUI.Base.ElementMapper');
    var Element = package('COM.GUI.Base.Element');

    function setup(push) {
        var holder = jQuery('#holder');
        var element = jQuery('<span>');

        var mapper = new Mapper();

        var f_el = new Element({
            id: 'id',
            class: 'class',
            holder: holder,
            element: element
        });

        var s_el = new Element({
            id: 'id',
            class: 'class',
            holder: holder,
            element: element
        });

        var t_el = new Element({
            id: 'id',
            class: 'class',
            holder: holder,
            element: element
        });

        if(push === true) {
            mapper.push(f_el);
            mapper.push(s_el);
            mapper.push(t_el);
        }

        return {
            holder: holder,
            element: element,
            mapper: mapper,
            f_el: f_el,
            s_el: s_el,
            t_el: t_el
        };
    }

    it("push && remove", function() {
        var data = setup();

        refute.arrayContain(
            data.mapper.$ElementMapper_Mapped,
            data.f_el
        );

        data.mapper.push(data.f_el);
        assert.arrayContain(
            data.mapper.$ElementMapper_Mapped,
            data.f_el
        );

        data.mapper.remove(data.f_el);
        refute.arrayContain(
            data.mapper.$ElementMapper_Mapped,
            data.f_el
        );

        var BadMock = function() {};

        assert.exception(function() {
            var badMock = new BadMock();
            data.mapper.push(badMock);
        });
    });

    it("clear", function() {
        var data = setup(true);
        assert.equals(
            data.mapper.$ElementMapper_Mapped.length,
            3
        );

        data.mapper.clear();
        assert.equals(
            data.mapper.$ElementMapper_Mapped.length,
            0
        );
    });

    it("getElements", function() {
        var data = setup(true);

        assert.equals(
            data.mapper.getElements(),
            [data.f_el, data.s_el, data.t_el]
        );
    });

    it("getElement", function() {
        var data = setup(true);

        assert.equals(
            data.mapper.getElement(0),
            data.f_el
        );

        assert.equals(
            data.mapper.getElement(1),
            data.s_el
        );

        assert.equals(
            data.mapper.getElement(2),
            data.t_el
        );
    });

    it("test interfaces", function() {
        var data = setup();

        assert.isTrue(data.mapper.hasInterface('COM.GUI.Interfaces.DataMapperInterface'));
        assert.isTrue(data.mapper.hasInterface('COM.GUI.Interfaces.RenderInterface'));
        assert.isTrue(data.mapper.hasInterface('COM.GUI.Interfaces.HolderInterface'));
    });
});