/**
 * COM.Events.Observer
 *
 * Данный набор методов, позволяет расширить основной класс так, чтоб он смог начинать
 * слушать события, которые происходят в системе;
 */
(function() {
    var Observer = {};

    Observer.$super = 'Observer';

    Observer.init = function() {
        this.$Observer_EventsHandler = {};
        this.$Observer_AllEventsHandler = [];
    };

    /**
     * Вызов события
     * @param  {string} eventName  Имя события
     * @param  {mixing} eventValue Аргументы события
     * @return {void}
     */
    Observer.fireEvent = function(eventName, eventValue) {
        var i, max, eventListeners, globalEventListeners;

        if(this.$Observer_EventsHandler[eventName] === undefined) {
            throw new Error('Данное событие небыло зарегистрировано');
        }

        eventListeners = this.$Observer_EventsHandler[eventName];
        globalEventListeners = this.$Observer_AllEventsHandler;

        for(i = 0, max = eventListeners.length; i < max; i++) {
            eventListeners[i](eventValue);
        }

        for(i = 0, max = globalEventListeners.length; i < max; i++) {
            globalEventListeners[i](eventName, eventValue);
        };
    };

    /**
     * Подписка на событие
     * @param  {string} eventName Имя события
     * @param  {fn}     eventFn   Callback события
     * @return {void}
     */
    Observer.subscribe = function(eventName, eventFn) {
        if(this.$Observer_EventsHandler[eventName] === undefined) {
            throw new Error('Данное событие небыло зарегистрировано');
        }

        this.$Observer_EventsHandler[eventName].push(eventFn);
    };

    /**
     * Отписка от события
     * @param  {string} eventName Имя события
     * @param  {fn}     eventFn   Callback события
     * @return {boolean}
     */
    Observer.unsubscribe = function(eventName, eventFn) {
        var eventListeners;

        if(this.$Observer_EventsHandler[eventName] === undefined) {
            throw new Error('Данное событие небыло зарегистрировано');
        }

        eventListeners = this.$Observer_EventsHandler[eventName];

        if(eventListeners[i] === eventFn) {
            eventListeners.slice(i, 1);
            return true;
        }

        return false;
    };

    /**
     * Производит подписку на всех слушателей событий
     * @param  {fn} eventFn Callback события
     * @return {void}
     */
    Observer.subscribe_for_all = function(eventFn) {
        this.$Observer_AllEventsHandler.push(eventFn);
    };

    /**
     * Производит отписку от всех слушателей событий
     * @param  {fn} eventFn Callback события
     * @return {void}
     */
    Observer.unsubscribe_for_all = function(eventFn) {
        Array.remove(this.$Observer_AllEventsHandler, eventFn);
    };

    /**
     * Регистрация списка событий
     * @param  {array}  eventsList Список событий на иницилизацию
     * @return {void}
     */
    Observer.registerEvents = function(eventsList) {
        for(var i = 0; i < eventsList.length; i++) {
            this.$Observer_EventsHandler[eventsList[i]] = [];
        }
    };

    /**
     * Прозводит исключение событий из списка fireEvent`ов
     * @param  {array} eventsList Имя события
     * @return {void}
     */
    Observer.removeEvents = function(eventsList) {
        for(var i = 0; i < eventList.length; i++) {
            delete this.$Observer_EventsHandler[eventList];
        }
    };

    /**
     * Производит проверку записи событий
     * @param  {string} eventName Имя события
     * @return {boolean}
     */
    Observer.hasEvent = function(eventName) {
        return !!this.$Observer_EventsHandler[eventName];
    };

    /**
     * Возвращает кол-во слущателей, на данное событие
     * @param  {[type]} eventName [description]
     * @return {[type]}           [description]
     */
    Observer.sumEventListenters = function(eventName) {
        if(this.$Observer_EventsHandler[eventName] === undefined) {
            throw new Error('Данные слушатель не установлен');
        }

        return this.$Observer_EventsHandler[eventName].length;
    };

    packeg('COM.Events.Observer', Observer);
})();