angular.module('Diferentonas')

.controller('InitiativeRepliesCtrl', ['$stateParams', '$http', '$ionicLoading', 'ionicToast', 'City', function($stateParams, $http, $ionicLoading, ionicToast, City) {
    var vm = this;
    var api = "http://diferentonas.herokuapp.com";
    vm.id = $stateParams.id_city;
    vm.score = $stateParams.score;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    vm.replies = [];
    vm.reply = "";
    vm.submitReply = function() {
      $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
      $http.post(api.concat("/iniciativas/", vm.id_initiative, "/opinioes"), vm.replay, {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Opinião enviada com sucesso.", 'middle', false, 2500);
          vm.replies.push({ "text": vm.reply });
          vm.reply = "";
      }).error(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Algo deu errado.", 'middle', false, 2500);
      });
    }

    if (!vm.city.hasData()) {
      var api = 'http://diferentonas.herokuapp.com/cidade/';
      // var api = 'http://0.0.0.0:9000/cidade/';
      $http.get(api.concat(vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      })
      $http.get(api.concat(vm.id).concat('/similares'), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      })
      $http.get(api.concat(vm.id).concat('/iniciativas'), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.inicitivas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
          City.inicitivas = data;
      })
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
    }
}]);
