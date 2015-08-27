(function () {
    angular.module('car-finder')
    .factory('testCarSvc', ['$q', function ($q) {
        var f = {};

        f.getYears = function () {
            var d = $q.defer();
            d.resolve(['1999', '2000', '2001', '2002']);
            return d.promise;
        }

        f.getMakes = function (year) {
            var d = $q.defer();
            switch (year) {
                case '1999':
                case '2000':
                    d.resolve(['kia', 'ford']);
                    break;
                case '2001':
                case '2002':
                    d.resolve(['acura', 'chevy']);
                    break;

            };
            return d.promise;
        }

        f.getModels = function (year, make) {
            var d = $q.defer();
            switch (make) {
                case 'kia':
                    d.resolve(['optima', 'soul']);
                    break;
                case 'ford':
                    d.resolve(['mustang', 'f150']);
                    break;
                case 'acura':
                    d.resolve(['integra', 'rdx']);
                    break;
                case 'chevy':
                    d.resolve(['volt', 'impala']);
                    break;
            };

            return d.promise;
        }

        f.getTrims = function (year, make, model) {
            var d = $q.defer();
            switch (model) {
                case 'optima':
                    d.resolve(['4-door']);
                    break;
                case 'soul':
                    d.resolve(['hatchback']);
                    break;
                case 'mustang':
                    d.resolve(['coupe']);
                    break;
                case 'f150':
                    d.resolve(['pickup']);
                    break;
                case 'integra':
                    d.resolve(['coupe']);
                    break;
                case 'rdx':
                    d.resolve(['suv']);
                    break;
                case 'volt':
                    d.resolve(['hatchback']);
                    break;
                case 'impala':
                    d.resolve(['4-door']);
                    break;
            };

            return d.promise;
        }

        f.getCars = function (year, make, model, trim) {
            var d = $q.defer();
            d.resolve([
                {
                    year: year,
                    make: make,
                    model: model,
                    trim: trim,
                    color: 'black'
                },

                {
                    year: year,
                    make: make,
                    model: model,
                    trim: trim,
                    color: 'white'
                }
            ]);
            return d.promise;
        };

        return f;
    }]);
})();