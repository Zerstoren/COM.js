describe("Prototype Function", function() {
    it("is", function() {
        assert.isTrue(Function.is(function(){}));

        assert.isFalse(Function.is());
        assert.isFalse(Function.is({}));
        assert.isFalse(Function.is([]));
        assert.isFalse(Function.is("string"));
        assert.isFalse(Function.is(1));
        assert.isFalse(Function.is(NaN));
        assert.isFalse(Function.is(false));
        assert.isFalse(Function.is(true));
        assert.isFalse(Function.is(Infinity));
    });
});
