(function () {
    angular.module('car-finder').controller('carController',
    ['carSvc',function (carSvc) {
        var self = this;

        this.selected = {
            year:'',
            make:'',
            model:'',
            trim:''
        }

        this.options = {
            years:'',
            makes:'',
            models:'',
            trims:''
        }

        this.cars =[];
        
        this.getYears = function () {
            carSvc.getYears().then(function (data) {
                self.options.years = data;
            });
        }

        this.getMakes = function () {
            self.getCars()
            carSvc.getMakes(self.selected.year).then(function (data) {
                self.options.makes = data;
            });
        }

        this.getModels = function () {
            self.getCars()
            carSvc.getModels(self.selected.year, self.selected.make).then(function (data) {
                self.options.models = data;
            });
        }

        this.getTrims = function () {
            self.getCars()
            carSvc.getTrims(self.selected.year, self.selected.make, self.selected.model).then(function (data) {
                self.options.trims = data;
            });
        }

        this.getCars = function () {
            carSvc.getCars(self.selected.year, self.selected.make, self.selected.model, self.selected.trim).then(function (data) {
                self.cars = data;
            });
        }

        this.getYears();
    }]);
})();