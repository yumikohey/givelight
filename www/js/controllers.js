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
      $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('MainCtrl', function($scope, $stateParams, $http, $compile) {
    console.log($stateParams);
    $scope.volunteerData = false;
    data = {
      weekly_hrs: 5
    }
    $http.put('http://localhost:3000/volunteers/' + $stateParams.id, data)
    .success(function (data, status, headers) {
        console.log(data);
    })

    $scope.listVolunteers = function(departmentIndex) {
      if($scope.volunteerData){
        $scope.volunteerData = false;
      } else {
        $scope.volunteerData = true;
      }
      var depId = {
        id: departmentIndex
      }
      $scope.properIndex = departmentIndex;
      $http.get('http://localhost:3000/departments/' + departmentIndex, depId)
      .success(function (data, status, headers) {
          $scope.volunteers = data.departments
          $scope.totalVolunteers = $scope.volunteers.length;
      })
    }
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
