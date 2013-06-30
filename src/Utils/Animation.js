(function() {

    var Animation = {};

    Animation.moveTo = function(x, y, frames) {
        if(frames <= 0) {
            throw new Error('Нельзя устанавливать кол-во кадров менее единицы');
        }

        if(this.moveToAnimation === true) {
            return;
        } else {
            this.moveToAnimation = true;
        }

        var interval,
            self = this,
            perFrameX = (x - self.position.x) / frames,
            perFrameY = (y - self.position.y) / frames;

        interval = setInterval(function() {
            frames -= 1;
            self.setPosition(
                self.position.x + perFrameX,
                self.position.y + perFrameY
            );

            if(self.layer) {
                self.layer.fireEvent('update');
            };

            if(frames == 0) {
                clearInterval(interval);
                self.setPosition(x, y);

                if(self.layer) {
                    self.layer.fireEvent('update');
                };

                self.moveToAnimation = false;
            }
        }, 1000 / 60);
    };

    packeg('COM.Utils.Animation', Animation);

})();