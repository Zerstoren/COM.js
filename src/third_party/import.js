(function() {

var Import = {
    $savePlace: {},
    putModule: function(path, obj) {
        this.deepSearch(path, obj);
    },

    getModule: function(path) {
        return this.deepSearch(path);
    },

    deepSearch: function(pathString, setData) {
        var path = pathString.split('.');
        var prevPath = this.$savePlace;

        for(var x = 0, maxItems = path.length; x < maxItems; x++) {
            if(prevPath[path[x]] === undefined) {
                prevPath[path[x]] = {};
            }

            if(setData === undefined && x + 1 === maxItems) {
                return prevPath[path[x]];
            } else if(setData !== undefined && x + 1 === maxItems) {
                if(_.isObject(prevPath) && !(prevPath instanceof Array)) {
                    prevPath[path[x]] = setData;
                } else {
                    throw new Error("Path `" + pathString + "` can`t define in `" + (path.splice(0, path.length-1).join('.')) + "`");
                }

            }

            prevPath = prevPath[path[x]];

        }
    }
};

window.packeg = function(path, obj) {
    if(obj !== undefined) {
        Import.putModule(path, obj);
    } else {
        return Import.getModule(path);
    }
};

})();

packeg('_', _);
