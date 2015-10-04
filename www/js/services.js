angular.module('starter.services', [])

.factory('UserSession', function($resource) {
  return $resource("http://lighthelper.herokuapp.com/volunteers/sign_in.json");
})

.factory('UserProfile', function($resource) {
  return $resource("http://lighthelper.herokuapp.com/volunteers/sign_in.json");
})

