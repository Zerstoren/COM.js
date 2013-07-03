/**
 * Библиотека по работе с Canvas в качестве фигур используются исключительно объекты воздействия
 * COM (Canvas Object Model)
 *
 * Идея библиотеки заключается в следующем:
 *  У нас есть холст, на котором размещается ряд объектов. Когда мы хотим ввести объект на холст,
 *  мы просто указываем ссылку на объект. Если нам нужно изьять объект из холста, мы просто указываем
 *  ссылку на объект.
 *
 *  Когда объекты пересекаются на холсте, они должны оповещают дру друга об этом и решают, кто первый
 *  из них будет перерисован.
 *
 *  Главная идея библиотеки - никаких рисований на холсте, используя клиентский код не должно
 *  происходить. Все рисовки, прослушки, оптимизации, пересечения, колизии, конфликты устраняет
 *  библиотка. Клиентский код, должен только реагировать на эти действия.
 *
 *  Рисовать можно только через плагины, если это очень нужно.
 */

(function() {

packeg('COM', {});
packeg('COM.Config', {
    'Debug': true,

    'DebugTextSize': true,
    'DebugWorker': true
});

/**
 * Данный файл будет состоять чуть больше чем полностью из комментариев, в связи с тем, что все
 * подключения будут происходить через систему пакетов.
 *

COM.Extend
Производит работу c расширяемыми элементами

COM.Socket
Производит работу с сервером через веб сокеты

COM.Worker
Класс для работы с поткоами

**** Пакет COM.App ****
Приложение, в котором содержится логика воздействия на интерфейсы приложения

    COM.App.Application
    Система управления приложением

    COM.App.Layer
    Система управления слоем

    COM.App.LayerWorker
    Система управления слоем и системой подсчетов через Worker

**** Пакет COM.Map ****
Набор классов для реализации карты, тайлов, элементов, управления, событий и всего прочего


**** Пакет COM.Utils ****
Набор утилит, для упрощения работы с элементами

    COM.Utils.Animation
    Набор методов для реализации анимации

    COM.Utils.LayerInit
    Набор методов для взаимодействия с слоем

    COM.Utils.Cache
    Набор методов, для реализации кэширования объектов наследуемых от COM.Shapes.Rectangle

**** Пакет COM.Shapes ****
Набор геометрических объектолв и элементов управления

    COM.Shapes.Shape
    Базовая фигура для работы других элементов

    COM.Shapes.Rectangle
    Фигура для рисования прямоугольников

    COM.Shapes.Image
    Класс для рисования изображений

    COM.Shapes.Text
    Класс для рисования текста

    COM.Shapes.GroupShapes
    Класс для группировки объектов

**** Пакет COM.Events ****
Прототипы событий, который используется для внедрения в объекты системы и пользователей

    COM.Events.Observer
    Абстрактный интерфейс, для работы с событиями

    COM.Events.Dom
    Абстрактный интерфейс, для работы с событиями DOM элементов

    COM.Events.Draggable
    Абстрактный интерфейс, для работы с событиями драга

**** Пакет COM.Context2d ****
Создает абстракцию над canvas контекстом. Реализовывая свой контекст 2d-com
Данные пакет не стоит вызывать и использовать вручную

    COM.Context2d.Abstract
    Реадизовывает сбор всех методов в один контекст

    COM.Context2d.Base
    Реализовывает базовый функционал примитивов

    COM.Context2d.Image
    Реализовывает функционал по работе с изображениями

    COM.Context2d.Text
    Реализовывает функционал по отрисовке текста на холсте

**** Пакет COM.GUI ****
Имеет набор всех нужных элементов для манипуляции GUI элементами

    **** Пакет COM.GUI.Base ***
    Пакет для базовой работы с элементами

        COM.GUI.Base.Element
        Базовый элемент, для реализации всех элементов интерфейса

    **** Пакет COM.GUI.Form ****
    Набор прототипов для реализации кнопок

        COM.GUI.Form.Button
        Обычная кнопка

        COM.GUI.Form.Field
        Базовый набор функций для реализации полей

        COM.GUI.Form.Hidden
        Реализовывает возможность создания скрытых полей

        COM.GUI.Form.Validation
        Реализует набор возможностей для валидации полей

        СOM.GUI.Form.Text
        Текстовое поле

        COM.GUI.Form.Number
        Числовое поле

        COM.GUI.Form.Select
        Поле выбора

        COM.GUI.Form.Radio
        Поле радио кнопок

        COM.GUI.Form.File
        Поле файла

    **** Пакет COM.GUI.Layer ****
    Набор методов, для реализации слоев и воздействия на них

        COM.GUI.Layer.Grid
        Создание системы воздействия клиента и сервера

*/

})();