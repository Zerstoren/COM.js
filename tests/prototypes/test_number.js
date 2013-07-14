describe("Prototype Number", function() {

    it("uniqueId", function() {
        assert.equals("buster-1", Number.uniqueId('buster-'));
        assert.equals("fix-2", Number.uniqueId('fix-'));
        assert.equals("blum-3", Number.uniqueId('blum-'));
        assert.equals("set-4", Number.uniqueId('set-'));
    });

    it("is", function() {
        assert.isTrue(Number.is(1));
        assert.isTrue(Number.is(0));
        assert.isTrue(Number.is(NaN));
        assert.isTrue(Number.is(Infinity));

        assert.isFalse(Number.is());
        assert.isFalse(Number.is({}));
        assert.isFalse(Number.is(function(){}));
        assert.isFalse(Number.is([]));
        assert.isFalse(Number.is("string"));
        assert.isFalse(Number.is(false));
        assert.isFalse(Number.is(true));
    });

});
