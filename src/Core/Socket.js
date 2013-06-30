/**
 * Класс-абстракция над веб сокетами. Доступны только современные браузеры.
 */
(function(packeg) {

    Socket = function(host, port) {
        this.init(host, port);
    };

    Socket.prototype.$super = 'Socket';

    /**
     * Автоматически иницилизатор соединения и всего остального
     * @return {void}
     */
    Socket.prototype.init = function(host, port) {
        this.host = host;
        this.port = port;

        this.need_reconnect = true;

        if(window.MozWebSocket && window.WebSocket === undefined) {
            window.WebSocket = window.MozWebSocket;
        }

        this.listeners = {};
        this.registerEvents([
            'message', 'close', 'connect', 'reconnect', 'connect_failed'
        ]);

        // Bugfix for old Firefox MozWebSocket
        // Don`t disconnect, before close browser
        // Close socket on tab close
        window.addEventListener('beforeunload', this.close.bind());
    };

    /**
     * Установка соединения с сервером
     * @param  {boolean} reconnect Установить соединение, как повторное.
     * @return {void}
     */
    Socket.prototype.connect = function(reconnect) {
        if(reconnect !== undefined) {
            this.need_reconnect = reconnect;
        }

        this.ws = new WebSocket('ws://' + this.host + ':' + this.port + '/');
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
    }

    /**
     * Отправка сообщения на сервер
     * @param  {string}   module  Имя модуля
     * @param  {object}   message Объект сообщения
     * @param  {function} asyncFn Callback функция, для асинхронных запросов
     * @return {void}
     */
    Socket.prototype.send = function(module, message, asyncFn) {
        if(this.ws.send === undefined) {
            throw new Error('WebSocket not connected to server yet');
        }

        console.log('Send message:', modul, data);

        if(async) {
            var asyncName = Math.random();
            this.listeners[asyncName] = asyncFn;
            data.async = asyncName;
        }

    };

    /**
     * Закрывает сокет соединение
     * @return {void}
     */
    Socket.prototype.close = function() {
        this.need_reconnect = false;
        this.ws.close();
        this.ws = undefined;
        this.fireEvent('close');
    };

    /**
     * Подписка на сообщение с сервера
     * @param  {string}   eventName Имя события, на которое происходит подписка
     * @param  {function} eventFn   Callback функция, подписки
     * @return {void}
     */
    Socket.prototype.subscribe = function(eventName, eventFn) {
        var eventName = '$' + eventName;

        if(this.hasEvent(eventName) === false) {
            this.registerEvents([eventName]);
        };

        this.super('Observer', 'subscribe', [eventName, eventFn]);
    };

    /**
     * Отписка от сообщениф с сервера
     * @param  {string}   eventName Имя события, на которое происходит подписка
     * @param  {function} eventFn   Callback функция, подписки
     * @return {void}
     */
    Socket.prototype.unsubscribe = function(eventName, eventFn) {
        var eventName = '$' + eventName;

        if(this.hasEvent(eventName) === false) {
            this.registerEvents([eventName]);
        };

        this.super('Observer', 'unsubscribe', [eventName, eventFn]);
    };

    /**
     * Возвращает кол-во запросов, которые ждут ответа от сервера
     * @return {[type]} [description]
     */
    Socket.prototype.queryInQueue = function() {
        return _.size(this.listeners);
    };

    /**
     * Получение сообщения с сервера
     * @param  {object} data Сообщение с сервера
     * @return {void}
     */
    Socket.prototype.onMessage = function(data) {
        var parseJson = packeg('$.parseJson');

        if(data.async !== undefined && this.listeners[data.async]) {
            this.listeners[data.async](parseJson(data.data));
            delete this.listeners[data.async];
            return;
        }

        self.fireEvent('message', parseJson(data.data));
    };

    /**
     * Событие открытия соединения с сервером
     * @return {void}
     */
    Socket.prototype.onOpen = function() {
        if(this.need_reconnect) {
            this.fireEvent('reconnect');
        } else {
            this.fireEvent('connect');
        }
    };

    /**
     * Событие закрытия соединения с сервером
     * @return {void}
     */
    Socket.prototype.onClose = function() {
        if(this.need_reconnect) {
            this.connect(true);
        } else {
            window.removeEventListener('beforeunload', this.close.bind());
        }
    };


    Object.extend(
        Socket.prototype,
        packeg('COM.Events.Observer')
    );

    packeg('COM.Socket', Socket);
})(packeg);
