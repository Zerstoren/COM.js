(function() {
    var Abstract = {};

    /**
     * Это универсальный метод отрисовки элементов на холсте.
     * Он вытягивает параметры объекта и отправляет на рисование.
     * @param  {object} obj Объект для отрисовки
     * @return {[type]}     [description]
     */
    Abstract.draw = function(obj) {
        var shape, i, max, group, place, saveStyle;

        // В случае, если объект закэширован

        if(obj.isCached === true) {
            palce = obj.getBoundingRect();

            this.drawImage({
                image: obj.cachedCanvas,
                x: palce.x,
                y: palce.y,
                width: palce.width,
                height: palce.height
            });

            return;
        }

        // В отрисовку может прийти объект-группа. Для этого пройдемся по всем элементам
        // группы и отрисуем их по очереди или просто утянем кэш
        if(obj.isGroup) {
            group = obj.getGroup();
            for(i = 0, max = group.length; i < max; i++) {
                this.draw(group[i]);
            }

            return;
        }

        shape = obj.DrawInfo;

        switch(shape.DrawAction) {
            case 'image':
                saveStyle = this.revertSaveStyle(shape.DrawStyleBack);
                this.applyStyle(shape.DrawStyleApply);

                this.drawImage({
                    image: obj.DrawImage,
                    x: obj.position.x,
                    y: obj.position.y,
                    width: obj.size.width,
                    height: obj.size.height
                });

                this.applyRevertStyle(saveStyle);

                break;

            case 'rect':
                saveStyle = this.revertSaveStyle(shape.DrawStyleBack);
                this.applyStyle(shape.DrawStyleApply);
                this[shape.DrawType + 'Rect'](
                    obj.position.x,
                    obj.position.y,
                    obj.size.width,
                    obj.size.height
                );

                this.applyRevertStyle(saveStyle);

                break;

            case 'text':
                saveStyle = this.revertSaveStyle(shape.DrawStyleBack);
                this.applyStyle(shape.DrawStyleApply);

                this[shape.DrawType + 'Text'](
                    obj.DrawText,
                    obj.position.x,
                    obj.position.y,
                    obj.DrawStyle.size,
                    obj.DrawStyle.space,
                    obj.size.width
                );

                this.applyRevertStyle(saveStyle);

                break;
        }
    };

    package('COM.Context2d.Abstract', Abstract);
})();
