/**
 * Класс-абстракция над веб сокетами. Доступны только современные браузеры.
 */
(function() {

    Socket = function(host, port) {
        this.init(host, port);
    };

    Socket.Counter = 0;

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
        this.super('Observer', 'init');
        this.registerEvents([
            'close', 'connect', 'reconnect', 'connect_failed', 'error'
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

        if(this.ws !== undefined) {
            return;
        }

        this.ws = new WebSocket('ws://' + this.host + ':' + this.port + '/');
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
    };

    /**
     * Отправка сообщения на сервер
     * @param  {string}   module  Имя модуля или RESTful имя
     * @param  {object}   message Объект сообщения
     * @param  {function} asyncFn Callback функция, для асинхронных запросов
     * @return {void}
     */
    Socket.prototype.send = function(module, message, asyncFn) {
        if(module.length !== 1 && (module[0] !== '/' || module[module.length -1] === '/')) {
            throw new Error('Wrong path type');
        }

        var data, asyncName = false;

        if(this.ws === undefined || this.ws.send === undefined) {
            throw new Error('WebSocket not connected to server yet');
        }

        console.log('Send message:', module, message);

        if(asyncFn) {
            asyncName = Math.random();
            this.listeners[asyncName] = asyncFn;
            Socket.Counter += 1;
        }

        data = {
            module: module,
            message: message,
            async: asyncName
        };

        this.ws.send(JSON.stringify(data));
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
        if(this.hasEvent(eventName) === false) {
            this.registerEvents([eventName]);
        }

        this.super('Observer', 'subscribe', [eventName, eventFn]);
    };

    /**
     * Отписка от сообщениф с сервера
     * @param  {string}   eventName Имя события, от которых происходит отписка
     * @param  {function} eventFn   Callback функция, подписки
     * @return {void}
     */
    Socket.prototype.unsubscribe = function(eventName, eventFn) {
        this.super('Observer', 'unsubscribe', [eventName, eventFn]);

        if(this.sumEventListenters(eventName) === 0) {
            this.removeEvents([eventName]);
        }
    };

    /**
     * Получение сообщения с сервера
     * @param  {object} data Сообщение с сервера
     * @return {void}
     */
    Socket.prototype.onMessage = function(data) {
        var parseJson = package('$.parseJson');

        if(data.async !== undefined && this.listeners[data.async]) {
            this.listeners[data.async](JSON.parse(data.data));
            delete this.listeners[data.async];
            Socket.Counter -= 1;
            return;
        }

        if(this.hasEvent(data.module)) {
            this.fireEvent(data.module, parseJson(data.data));
        }

        console.log('Get message:', data.module, parseJson(data.data));
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
            var self = this;
            this.ws.close();
            this.ws = undefined;
            setTimeout(function() {
                self.connect(true);
            }, 3000);
        } else {
            window.removeEventListener('beforeunload', this.close.bind());
            this.fireEvent('close');
        }
    };

    Socket.prototype.onError = function(a,b,c) {
        this.fireEvent('error');
    };


    Object.extend(
        Socket,
        package('COM.Extend'),
        package('COM.Events.Observer')
    );

    package('COM.Socket', Socket);
})();
