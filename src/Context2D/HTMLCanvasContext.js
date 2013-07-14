(function() {
    HTMLCanvasElement._newContexts = {};
    HTMLCanvasElement.addContext = function (name, ctx) {
        this._newContexts[name] = ctx;
        return this;
    };

    HTMLCanvasElement.getContext = function (name) {
        return this._newContexts[name] || null;
    };

    HTMLCanvasElement.prototype.getOriginalContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type) {
        if (!this.contextsList) {
            this.contextsList = {};
        }

        if (!this.contextsList[type]) {
            var ctx = HTMLCanvasElement.getContext(type);
            if (ctx) {
                ctx = new ctx(this);
            } else try {
                ctx = this.getOriginalContext.apply(this, arguments);
            } catch (e) {
                throw (!e.toString().match(/NS_ERROR_ILLEGAL_VALUE/)) ? e :
                    new TypeError('Wrong Context Type: «' + type + '»');
            }
            this.contextsList[type] = ctx;
        }
        return this.contextsList[type];
    };

    var Context2d = function(canvas) {
        this.ctx = canvas.getContext('2d');
    };

    Object.extend(
        Context2d,
        package('COM.Context2d.Image'),
        package('COM.Context2d.Base'),
        package('COM.Context2d.Text'),
        package('COM.Context2d.Abstract')
    );

    HTMLCanvasElement.addContext('2d-com', Context2d);

})();
