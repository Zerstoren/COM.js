/**
 * COM.Events.Observer
 *
 * Данный набор методов, позволяет расширить основной класс так, чтоб он смог начинать
 * слушать события, которые происходят в системе;
 */
(function() {
    var Observer = {};

    Observer.init = function() {
        this.$Observer_EventsHandler = {};
    };

    /**
     * Регистрация списка событий
     * @param  {array}  eventsList Список событий на иницилизацию
     * @return {void}
     */
    Observer.registerEvents = function(eventsList) {
        for(var i = 0; i < eventList.length; i++) {
            this.$Observer_EventsHandler[eventList[i]] = [];
        }
    };

    /**
     * Вызов события
     * @param  {string} eventName  Имя события
     * @param  {mixing} eventValue Аргументы события
     * @return {void}
     */
    Observer.fireEvent = function(eventName, eventValue) {
        var eventListeners;

        if(this.$Observer_EventsHandler[eventName] === undefined) {
            throw new Error('Данное событие небыло зарегистрировано');
        }

        eventListeners = this.$Observer_EventsHandler[eventName];
        for(var i = 0; i < eventListeners.length; i++) {
            eventListeners[i](eventValue);
        }
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
     * @return {void}
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

    packeg('COM.Events.Observer', Observer);
})();