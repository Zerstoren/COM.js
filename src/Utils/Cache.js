(function() {

    var Cache = {};

    Cache.$super = 'Cache';

    Cache.init = function() {
        this.isCached = false;
        this.cachedCanvas = null;
    };

    /**
     * Создает кэш данной группы
     * @return {this}
     */
    Cache.createCache = function(objectToCache) {
        var i, max,
            $ = packeg('$'),
            size = this.getBoundingRect();

        this.cachedCanvas = $('<canvas>').get(0);
        this.cachedCanvas.width = size.width;
        this.cachedCanvas.height = size.height;
        this.cachedCanvas.context = this.cachedCanvas.getContext('2d-com');

        for(i = 0, max = objectToCache.length; i < max; i++) {
            this.cachedCanvas.context.draw(objectToCache[i]);
        }

        this.isCached = true;

        return this;
    };

    /**
     * Удаляет кэш данной группы
     */
    Cache.removeCache = function() {
        this.isCached = false;
        this.cachedCanvas = null;

        return this;
    };

    packeg('COM.Utils.Cache', Cache);

})();