(function() {
    /**
     * Класс-воркер, позволяет создавать и управлять воркерами
     * @param  {Function} fn    Функция воркер
     * @param  {string}   name  Имя воркера
     */
    var WorkerProto = function(fn, name) {
        this.$Worker_Executor = null;
        this.$Worker_CreateBlob(fn);

        this.$Worker_Name = name;
        // Observer init
        this.init();
        this.registerEvents([
            'onmessage'
        ]);
    };

    /**
     * Создает нового воркера
     * @return {void}
     */
    WorkerProto.prototype.start = function() {
        this.$Worker_Executor = new Worker(this.$Worker_ThreadScript);
        this.$Worker_Executor.onmessage = this.$Worker_OnMessage.bind(this);
    };

    /**
     * Отправка сообщения воркеру
     * @param  {mixed} message Данные сообщения
     * @return {void}
     */
    WorkerProto.prototype.message = function(message, show) {
        if(this.$Worker_Executor === null) {
            throw new Error('Worker not started yet');
        }

        if(packeg('COM.Config.DebugWorker') && show) {
            console.log('To Worker `' + this.$Worker_Name + '`', message);
        }

        this.$Worker_Executor.postMessage(message);
    };

    /**
     * Переименовывает воркер
     * @param  {string} name Новое имя
     * @return {void}
     */
    WorkerProto.prototype.rename = function(name) {
        this.$Worker_Name = name;
    }

    /**
     * Подготавливает данные для создание воркера
     * @param  {Function} fn Функция воркера
     * @return {void}
     */
    WorkerProto.prototype.$Worker_CreateBlob = function(fn) {
        var functional, toBlob, blob, objectUrl;

        functional = fn.toString().split("\n");
        toBlob = functional.splice(1, functional.length - 2);

        if(packeg('COM.Config.Debug') && packeg('COM.Config.DebugWorker')) {
            toBlob.push("self.log = function(data) { self.postMessage({log: true, value: data}); };");
        } else {
            toBlob.push("self.log = function(data) {};");
        }

        blob = new Blob([
            toBlob.join("\n")
        ], { type: "text/javascript" });

        this.$Worker_ThreadScript = window.URL.createObjectURL(blob);
    };

    /**
     * Событие получения сообщения от воркера
     * @param  {eventWorker} e Событие от воркера
     * @return {void}
     */
    WorkerProto.prototype.$Worker_OnMessage = function(e) {
        if(packeg('COM.Config.DebugWorker') && e.data.log) {
            console.log('From Worker `' + this.$Worker_Name + '`', e.data.value);
            return;
        }

        this.fireEvent('onmessage', e.data);
    };

    Object.extend(
        WorkerProto,
        packeg('COM.Extend'),
        packeg('COM.Events.Observer')
    );

    packeg('COM.Core.Worker', WorkerProto);
})();
