/**
 * [ description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
Object.clone =  function(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" != typeof obj) return obj;
    var copy;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = Object.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = Object.clone(obj[attr]);
        }
        return copy;
    }

    if(obj instanceof Function) {
        return obj;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};


Object.extend = function() {
    var options, name, copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length;

    for(; i < length; i++) {
        if((options = arguments[i]) === undefined) {
            continue;
        }

        for(name in options) {
            copy = options[name];

            if(target.prototype[name] === undefined && name !== '$super') {
                target.prototype[name] = copy;
            } else if(name !== '$super' && options.$super !== undefined) {
                target.prototype['$$super_' + options.$super + '_' + name] = copy;
            }
        }
    }

    return target;
};


Object.merge = function(target, source) {
    var name;
    for(name in source) {
        target[name] = source[name];
    }

    return target;
};
