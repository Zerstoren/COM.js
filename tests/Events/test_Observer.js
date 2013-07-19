describe('COM.Events.Observer', function() {
    var Proto = function() {

    };
    Proto.prototype.$super = 'Proto';

    Object.extend(
        Proto,
        package('COM.Events.Observer')
    );

    handler = function() {};

    it('registerEvents && hasEvent', function() {
        var item = new Proto();
        item.init();

        item.registerEvents(['1', '2']);

        assert.isTrue(item.hasEvent('1'));
        assert.isTrue(item.hasEvent('2'));
        assert.isFalse(item.hasEvent('3'));

    });

    it('removeEvents', function() {
        var item = new Proto();
        item.init();
        item.registerEvents(['1', '2']);

        assert.isTrue(item.hasEvent('1'));
        assert.isTrue(item.hasEvent('2'));

        item.removeEvents(['1', '2']);
        assert.isFalse(item.hasEvent('1'));
        assert.isFalse(item.hasEvent('2'));
    });

    it("subscribe", function() {
        var item = new Proto();
        item.init();
        item.registerEvents(['event'])

        item.subscribe('event', handler);
        assert.same(
            item.$Observer_EventsHandler['event'][0],
            handler
        );
    });

    it("unsubscribe", function() {
        var item = new Proto();
        item.init();
        item.registerEvents(['event']);

        item.subscribe('event', handler);
        assert.same(
            item.$Observer_EventsHandler['event'][0],
            handler
        );

        assert.isTrue(
            item.unsubscribe('event', handler)
        );

        assert.exception(function() {
            item.unsubscribe('event', function(){})
        });

        refute.same(
            item.$Observer_EventsHandler['event'][0],
            handler
        );
    });

    it("subscribe_for_all", function() {
        var item = new Proto();
        item.init();
        item.registerEvents(['event']);

        item.subscribe_for_all(handler);

        assert.same(
            item.$Observer_AllEventsHandler[0],
            handler
        );
    });

    it("unsubscribe_for_all", function() {
        var item = new Proto();
        item.init();
        item.registerEvents(['event']);

        item.subscribe_for_all(handler);
        assert.same(
            item.$Observer_AllEventsHandler[0],
            handler
        );

        item.unsubscribe_for_all(handler);
        refute.same(
            item.$Observer_AllEventsHandler[0],
            handler
        );
    });

    it('sumEventListenters', function() {
        var item = new Proto();
        item.init();

        item.registerEvents(['event']);

        item.subscribe('event', handler);
        item.subscribe('event', handler);
        item.subscribe('event', handler);

        assert.equals(item.sumEventListenters('event'), 3);

        item.unsubscribe('event', handler);
        assert.equals(item.sumEventListenters('event'), 2);

        item.unsubscribe('event', handler);
        assert.equals(item.sumEventListenters('event'), 1);

        item.unsubscribe('event', handler);
        assert.equals(item.sumEventListenters('event'), 0);
    });

    it('fireEvent', function() {
        var item = new Proto();
        item.init();

        item.registerEvents(['event']);


        var local = false;
        var global = false;
        var localHandler = function(param) {
            local = param;
        };

        var globalHandler = function(evName, param) {
            global = param;
        }

        item.subscribe('event', localHandler);
        item.subscribe_for_all(globalHandler);

        item.fireEvent('event', true);

        assert.isTrue(local);
        assert.isTrue(global);
    });

});