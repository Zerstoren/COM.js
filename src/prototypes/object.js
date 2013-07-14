(function() {
    /**
     * Производит глубокое копирование объекта. Акуратнее с классами
     * @param  {object} obj Копируемый объект
     * @return {object}     Новая копия объекта
     */
    Object.deepcopy =  function(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null === obj || "object" != typeof obj) return obj;
        var copy;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = Object.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = Object.deepcopy(obj[attr]);
            }
            return copy;
        }

        if(obj instanceof Function) {
            return obj;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    /**
     * Производит поверхностное копирование объекта
     * @param  {object} cloned Данные объекта
     * @return {object}        Новый объект
     */
    Object.copy = function(cloned) {
        var name, clone = {};

        for(name in cloned) {
            // Handle the 3 simple types, and null or undefined
            if (null === cloned || "object" != typeof cloned) {
                clone[name] = cloned[name];
            }

            // Handle Array
            if (cloned instanceof Array) {
                clone[name] = cloned[name];
            }

            // Handle Object
            if (cloned instanceof Object) {
                clone[name] = cloned[name];
            }

            if(cloned instanceof Function) {
                clone[name] = cloned[name];
            }
        }

        return clone;
    };

    /**
     * Производит расширение прототипа.
     * Первым аргументом указывается цель расширения, остальные объекты,
     * которые расширять прототип
     * @return {void}
     */
    Object.extend = function() {
        var options, name, copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;

        for(; i < length; i++) {
            if((options = arguments[i]) === undefined) {
                continue;
            }

            if(Object.size(options) === 0) {
                throw new Error('You add empty instance');
            }

            if(options.$super) {
                target.prototype['$$super_instance_' + options.$super] = options.$super;
            }

            for(name in options) {
                copy = options[name];

                if(target.prototype[name] === undefined && name !== '$super') {
                    target.prototype[name] = copy;
                } else if(name !== '$super' && options.$super !== undefined) {
                    target.prototype['$$super_' + options.$super + '_' + name] = copy;
                }
            }
        }

        return target;
    };

    /**
     * Производит имплементирование интерфейсов в систему.
     * Первый аргумент, цель имплементирования.
     * Остальные объекты - интерфейсы
     *
     * В случае, если интерфейс не удовлетворен, будет вызвана ошибка
     *
     * @return {void}
     */
    Object.interface = function() {
        var options, name, copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;

        for(; i < length; i++) {

            if((options = arguments[i]) === undefined) {
                continue;
            }

            if(Object.size(options) === 0) {
                throw new Error('You add empty interface');
            }

            for(name in options) {
                copy = options[name];

                if(name === '$interface') {
                    target.prototype['$$interface_' + copy] = copy;
                } else {
                    if(target.prototype[name] === undefined) {
                        throw new Error('Class is not realizate interface method ' + name);
                    } else if(target.prototype[name].length !== copy) {
                        throw new Error('Method `' + name + '` get ' +
                            target.prototype[name].length + ' parameters, but interface need ' + copy);
                    }
                }
            }
        }
    };

    /**
     * Производит слияние двух объектов,
     * с перезаписью методов, данными из source
     * @param  {object} target Цель слияния
     * @param  {object} source Данные для слияния
     * @return {object}        Возврашается цель слияния
     */
    Object.merge = function(target, source) {
        var name;
        for(name in source) {
            target[name] = source[name];
        }

        return target;
    };

    Object.is = function(obj) {
        return (obj instanceof Object) && !(obj instanceof Function) && !(obj instanceof Array);
    };

    Object.size = function(obj) {
        if(obj == null) {
            return 0;
        }

        return Object.keys(obj).length;
    };

})();
