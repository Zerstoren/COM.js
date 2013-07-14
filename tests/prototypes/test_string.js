describe("Prototype String", function() {
    it("random", function() {
        var prevString = '',
            currentString = '';
        for(var i = 100; i--;) {
            currentString = String.random(16);
            refute.equals(currentString, prevString);
            prevString = currentString;
        }
    });


    it("is", function() {
        assert.isTrue(String.is("string"));

        assert.isFalse(String.is());
        assert.isFalse(String.is({}));
        assert.isFalse(String.is(0));
        assert.isFalse(String.is(function(){}));
        assert.isFalse(String.is([]));
        assert.isFalse(String.is(NaN));
        assert.isFalse(String.is(false));
        assert.isFalse(String.is(true));
        assert.isFalse(String.is(Infinity));
    });
});
