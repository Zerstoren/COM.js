Array.remove = function(list, value) {
    var index = list.indexOf(value);

    if(index === -1) {
        throw new Error('Value don`t contain in list');
    }

    list.splice(index, 1);
};

Array.merge = function(target, source) {
    for(var i = 0, max = source.length; i < max; i++) {
        target.push(source[i]);
    }

    return target;
};

Array.contain = function(list, value) {
    return list.indexOf(value) !== -1;
};

Array.clone = function(list) {
    cloned = [];
    cloned.concat(list);
    return cloned;
};