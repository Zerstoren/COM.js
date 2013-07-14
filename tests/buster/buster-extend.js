buster.assertions.add("isUndefined", {
    assert: function(value) {
        return value === undefined;
    },

    refute: function(value) {
        return value !== undefined;
    },
    assertMessage: "Is not undefined",
    refuteMessage: "Is undefined"
});

buster.assertions.add("isEmptyObject", {
    assert: function(object) {
        var iter = 0;
        for(var i in object) {
            iter += 1;
        }

        return iter === 0;
    },
    assertMessage: "Expect empty object"
});

buster.assertions.add("elementExists", {
    assert: function(selector) {
        var element = jQuery(selector);
        return element.length === 0;
    },

    refute: function(selector) {
        var element = jQuery(selector);
        return element.length !== 0;
    },

    assertMessage: "Element is not exists by selector ${0}",
    refuteMessage: "Element is exists by selector ${0}"
});

buster.assertions.add("raises", {
    assert: function(fn, context, args) {
        try {
            fn.apply(context, args);
            return false;
        } catch(e) {
            return true;
        }
    },
    assertMessage: "Method not throw error"
});
