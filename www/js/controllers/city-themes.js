angular.module('Diferentonas')

.controller('CityThemesCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', '$ionicScrollDelegate', 'City', function($ionicHistory, $stateParams, $http, $ionicLoading, $ionicScrollDelegate, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id_city}, function() {
      vm.city.hasDifferentThemes = City.hasDifferentThemes(vm.city.scores);
      vm.city.hasNeutralThemes = City.hasNeutralThemes(vm.city.scores);
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
    });
    vm.showNeutralThemes = false;

    vm.orderByScore = function(score) {
      if (score.area == "TOTAL GERAL" && City.isNeutral(score)) {
        return 10;
      }
      return Math.abs(score.valorScore)*-1;
    }
    vm.toggleNeutralThemes = function() {
      vm.showNeutralThemes = !vm.showNeutralThemes;
    }

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

}]);
