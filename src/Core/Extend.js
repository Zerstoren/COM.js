/**
 * COM.Core.Extend
 *
 * Данный метод позволяет автоматически вызвать все родительские иницилизаторы
 */
(function() {
    var Extend = {};

    /**
     * Производит вызов родительского метода, который был переопределен
     * @param  {string}   object    Имя вызываемого родительского объекта
     * @param  {string}   fn        Имя функции, которое будет вызвано
     * @param  {array}    args      Список аргументов для вызова
     * @return {void}
     */
    Extend.super = function(object, fn, args) {
        var name = '$$super_' + object + '_' + fn;

        if(this[name] === undefined) {
            throw new Error(object + '_' + fn + ' not exist in current class');
        }

        this[name].apply(this, args);
    };

    /**
     * Расширялся ли этот метод с помощью класса
     * @param  {string} instancePath Путь расширяемого класса
     * @return {boolean}             Расширялся ли этот метод
     */
    Extend.hasInstance = function(instancePath) {
        var instance = package(interfacePath),
            instanceName = instance.prototype ? instance.prototype.$super : instance.$super;

        if(interfaceName === undefined) {
            throw new Error('instance by path ' + interfacePath + ' not found');
        }

        return this['$$super_instance_' + instanceName] === instanceName;
    };

    /**
     * Проверка использования интерфейса данным классом
     * @param  {string}  interfacePath Путь к интерфейсу
     * @return {boolean}               Используется ли этот интерфейс
     */
    Extend.hasInterface = function(interfacePath) {
        var interfaceName = package(interfacePath).$interface;

        if(interfaceName === undefined) {
            throw new Error('Interface by path ' + interfacePath + ' not found');
        }

        return this['$$interface_' + interfaceName] === interfaceName;
    };

    /**
     * Добавляет новый метод в данный класс, полностью соблюдая порядок добавления прототипов
     * @param  {string}   name   Имя метода
     * @param  {Function} fn     Замыкающая функция
     * @return {void}
     */
    Extend.add_new_method = function(name, fn, $super) {
        if(this[name] !== undefined) {
            if($super === undefined) {
                throw new Error('Method can`t be added to this class. But for add parent don`t set `$super` name');
            }

            name = '$$super_' + $super + '_' + name;
        }

        this[name] = fn;
    };

    /**
     * Производит полную очистку объекта от элементов
     * !ВНИМАНИЕ - это может быть опасно. Убедитесь, что больше
     * не осталось используемых ссылок
     */
    Extend.$_clearMemory_$ = function() {
        for(var i in this) {
            this[i] = null;
        }
    };

    package('COM.Extend', Extend);
})();
