(function() {

    var LayerWorker = function() {
        self.onmessage = function(event) {
            var data = event.data;

            self.log(data);
        };

        self.init = function() {
            self.$Shapes = [];
        };

        self.init();
    };

    packeg('COM.App.LayerWorker', LayerWorker);
})();