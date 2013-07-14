describe("Prototype Object", function() {
    it("deepcopy", function() {
        var o1 = {"1": 1};
        var o2 = {"2": 2};
        var o3 = {"3": 3};

        var deepObj = {
            "o1": o1,
            "o2": o2,
            "o3": o3
        };

        var cloned = Object.deepcopy(deepObj);
        assert.equals(deepObj, cloned);

        refute.same(deepObj, cloned);
        refute.same(cloned["o1"], o1);
        refute.same(cloned["o2"], o2);
        refute.same(cloned["o3"], o3);

        deepObj["o1"] = {"4": 1};
        refute.equals(deepObj, cloned);
    });

    it("copy", function() {
        var o1 = {"1": 1};
        var o2 = {"2": 2};
        var o3 = {"3": 3};

        var obj = {
            "o1": o1,
            "o2": o2,
            "o3": o3
        };

        var cloned = Object.copy(obj);

        assert.equals(obj, cloned);
        refute.same(obj, cloned);

        assert.same(cloned["o1"], o1);
        assert.same(cloned["o2"], o2);
        assert.same(cloned["o3"], o3);

        obj['o4'] = 1;
        refute.equals(obj, cloned);
    });

    it("extend", function() {
        var Proto = function() {};
        Proto.prototype.$super = 'Proto';
        Proto.prototype.test = function() {};

        Object.extend(
            Proto,
            {name1: function() {}},
            {name2: function() {}},
            {name3: function() {}}
        );

        var proto = new Proto();

        assert.isFunction(Proto.prototype.name1);
        assert.isFunction(Proto.prototype.name2);
        assert.isFunction(Proto.prototype.name3);
        assert.isFunction(proto.name1);
        assert.isFunction(proto.name2);
        assert.isFunction(proto.name3);
    });

    it("interface", function() {
        var InterfaceExample = {};
        InterfaceExample.$interface = 'InterfaceExample';
        InterfaceExample.method1 = 0;
        InterfaceExample.method2 = 1;

        // All ok
        var Imp = function() {};
        Imp.prototype.method1 = function() {};
        Imp.prototype.method2 = function(param) {};

        Object.interface(
            Imp,
            InterfaceExample
        );

        refute.isUndefined(Imp.prototype.$$interface_InterfaceExample);

        // Class don`t have method for interface
        var Imp = function() {};
        Imp.prototype.method1 = function() {};
        assert.raises(Object.interface, this, [Imp, InterfaceExample]);

        // Class method don`t have needs arguments
        // Class don`t have method for interface
        var Imp = function() {};
        Imp.prototype.method1 = function() {};
        Imp.prototype.method2 = function() {};
        assert.raises(Object.interface, this, [Imp, InterfaceExample]);
    });

    it("merge", function() {
        var cfg = Object.merge({
            holder: 1,
            bolder: 2
        }, {
            bolder: 1,
            rows: 2
        });

        assert.equals(cfg, {
            holder: 1,
            bolder: 1,
            rows: 2
        });
    });

    it("is", function() {
        assert.isTrue(Object.is({}));

        assert.isFalse(Object.is());
        assert.isFalse(Object.is(function(){}));
        assert.isFalse(Object.is([]));
        assert.isFalse(Object.is("string"));
        assert.isFalse(Object.is(1));
        assert.isFalse(Object.is(NaN));
        assert.isFalse(Object.is(false));
        assert.isFalse(Object.is(true));
        assert.isFalse(Object.is(Infinity));
    });

    it("size", function() {
        var obj = {
            1: 1,
            2: 2,
            3: 3,
            "lol": 4
        };

        assert.equals(Object.size(obj), 4);
    });


});
