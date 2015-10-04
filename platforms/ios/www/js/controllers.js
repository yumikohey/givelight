angular.module('starter.controllers', [])

.controller('UserLoginCtrl', function($scope, $location, UserSession, $ionicPopup, $rootScope) {
  $scope.data = {};

  $scope.login = function() {
    var user_session = new UserSession({ volunteer: $scope.data });
    user_session.$save(
      function(data){
        window.localStorage['userId'] = data.id;
        window.localStorage['userName'] = data.name;
        $location.path('/tab/main/' + data.id);
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occured',
          template: error
        });
      }
    );
  }
})

.controller('appCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      console.log("hihihihihi");
      $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('MainCtrl', function($scope, $stateParams, $http) {
    console.log($stateParams);
    data = {
      weekly_hrs: 5
    }
    $http.put('http://localhost:3000/volunteers/' + $stateParams.id, data)
    .success(function (data, status, headers) {
        console.log(data);
    })
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
