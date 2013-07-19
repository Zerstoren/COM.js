describe("Prototype Array", function() {
    it("remove", function() {
        var list = [1, 2, 3, 5];
        Array.remove(list, 3);
        assert.equals(list, [1, 2, 5]);

        var testObj = {'testObj': 'testObj'};
        list = [
            testObj
        ];
        Array.remove(list, testObj);
        assert.equals(list, []);

        list = [];
        assert.exception(function() {
            Array.remove(list, 25);
        });
    });

    it("merge", function() {
        var list1 = [1, 2, 7];
        var list2 = [2, 4, 5];

        assert.equals(
            Array.merge(list1, list2),
            [1, 2, 7, 2, 4, 5]
        );

        assert.equals(
            list1,
            [1, 2, 7, 2, 4, 5]
        );
    });

    it("clone", function() {
        var list = [1, 2, 3, 4]
        var clone = Array.clone(list);

        assert.equals(clone, list);
        list[4] = 4;

        refute.equals(clone, list);
        refute.same(list, clone);
    });

    it("contain", function() {
        var list = [1, 2, 4, 8];
        assert.isTrue(Array.contain(list, 4));
        assert.isFalse(Array.contain(list, 9));
    });

    it("is", function() {
        assert.isTrue(Array.is([]));

        assert.isFalse(Array.is());
        assert.isFalse(Array.is({}));
        assert.isFalse(Array.is(function(){}));
        assert.isFalse(Array.is("string"));
        assert.isFalse(Array.is(1));
        assert.isFalse(Array.is(NaN));
        assert.isFalse(Array.is(false));
        assert.isFalse(Array.is(true));
        assert.isFalse(Array.is(Infinity));
    });

});
