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

.controller('ProgressCtrl', function($scope) {
    var percentage = document.getElementById('project-percentage');
    $scope.value = percentage.value;
    $scope.showPercentange = function() {
      $scope.value = percentage.value;
    }
})

.controller('MainCtrl', function($scope, $stateParams, $http, $location) {
    console.log($stateParams);
    $scope.volunteerData = false;
    data = {
      weekly_hrs: 5
    }
    $http.put('http://lighthelper.herokuapp.com/volunteers/' + $stateParams.id, data)
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
      $http.get('http://lighthelper.herokuapp.com/departments/' + departmentIndex, depId)
      .success(function (data, status, headers) {
          
          $scope.volunteers = data.departments;
          console.log($scope.volunteers);
          $scope.totalVolunteers = $scope.volunteers.length;
      })
    }

    $scope.progress = function(){
      $location.path('/progress');
    }
})

