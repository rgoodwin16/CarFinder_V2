(function () {
    angular.module('car-finder').controller('carController',
    ['$modal', 'carSvc', function ($modal, carSvc) {
        var self = this;

        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [{ image: '/Template/images/slideshow/Car_Reliable.jpg' }, { image: '/Template/images/slideshow/Car_Fast.png' }, { image: '/Template/images/slideshow/Car_Strong.jpg' }];
        

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

        this.cars = [];
        
        
        
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

        this.getCar = function (id) {
            $modal.open({
                templateUrl: '/App/templates/carModal.html',
                controller: 'carModalCtrl as mCtrl',
                size: 'lg',
                resolve: {
                    car: function () {
                        return carSvc.getCar(id);
                    }
                }
            });
            
            carSvc.getCar(id).then(function (data) {
                
            })
        }
   


        this.getYears();

    }]);

    angular.module('ui.bootstrap').controller('carModalCtrl', function ($modalInstance, car) {
        this.car = car;
        this.ok = function () {
            $modalInstance.close();
        };
    });

})();