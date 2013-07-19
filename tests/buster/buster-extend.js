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
        return element.length !== 0;
    },

    refute: function(selector) {
        var element = jQuery(selector);
        return element.length === 0;
    },

    assertMessage: "Element is not exists by selector ${0}",
    refuteMessage: "Element is exists by selector ${0}"
});

buster.assertions.add("sameJquery", {
    assert: function(target, source) {
        if(!(target instanceof jQuery)) {
            throw new Error('Target is not jquery instance');
        }

        if(!(source instanceof jQuery)) {
            throw new Error('Source is not jquery instance');
        }

        target.attr('data-buster-same', '1');
        result = source.attr('data-buster-same') === '1';
        target.removeAttr('data-buster-same');

        return result;
    },

    refute: function(target, source) {
        target.attr('data-buster-same', '1');
        result = source.attr('data-buster-same') !== '1';
        target.removeAttr('data-buster-same');

        return result;
    },
    assertMessage: "jQuery objects is not same",
    refuteMessage: "jQuery objects is same"

});

buster.assertions.add("arrayContain", {
    assert: function(list, value) {
        return list.indexOf(value) !== -1;
    },

    refute: function(list, value) {
        return list.indexOf(value) === -1;
    },
    assertMessage: "Array not contain value",
    refuteMessage: "Array is contain value"
});