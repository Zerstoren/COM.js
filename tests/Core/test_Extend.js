describe("COM.Extend", function() {
    var extend = package("COM.Extend");

    var Interface = {};
    Interface.$interface = 'Interface';
    package('_COM.Extend.Interface', Interface)

    var NotInterface = {};
    NotInterface.$interface = 'NotInterface';
    package('_COM.Extend.NotInterface', NotInterface)


    var Parent = function() {};
    Parent.prototype.$super = 'Parent';
    Parent.prototype.name = function() {
        return 'Parent';
    };
    package('_COM.Extend.Parent', Parent);

    var NotParent = function() {};
    NotParent.prototype.$super = 'NotParent';
    package('_COM.Extend.NotParent', NotParent);

    var Child = function() {};
    Child.prototype.$super = 'Child';
    Child.prototype.name = function() {
        return 'Child';
    };

    Object.extend(
        Child,
        extend,
        Parent.prototype
    );

    Object.interface(
        Child,
        Interface
    );

    it("super", function() {

        var item = new Child();

        assert.equals(item.name(), 'Child');
        assert.equals(item.super('Parent', 'name', []), 'Parent');

        assert.exception(function() {
            item.super("Parent", "undefinedName", []);
        });
    });

    it("hasInstance", function() {
        var item = new Child();

        assert.isTrue(item.hasInstance('_COM.Extend.Parent'));
        assert.isFalse(item.hasInstance('_COM.Extend.NotParent'));

        assert.exception(function() {
            item.hasInstance('_COM.Extend.UndefinedPack');
        });
    });

    it("hasInterface", function() {
        var item = new Child();

        assert.isTrue(item.hasInterface('_COM.Extend.Interface'));
        assert.isFalse(item.hasInterface('_COM.Extend.NotInterface'));

        assert.exception(function() {
            item.hasInterface('_COM.Extend.UndefinedInterface');
        });
    });

    it("add_new_method", function() {
        var item = new Child();

        assert.isUndefined(item.meth);

        item.add_new_method('meth', function(){});
        assert.isFunction(item.meth);

        assert.exception(function() {
            item.add_new_method('meth', function(){});
        });

        item.add_new_method('meth', function(){}, 'Parent');
        assert.isFunction(item.$$super_Parent_meth);
    });

    it("$_clearMemory_$", function() {
        var item = new Child();
        for(var i in item) {
            refute.isNull(item[i]);
        }

        item.$_clearMemory_$();

        for(var i in item) {
            assert.isNull(item[i]);
        }
    });
});