angular.module('starter.services', [])

.factory('UserSession', function($resource) {
  return $resource("http://localhost:3000/volunteers/sign_in.json");
})

.factory('UserProfile', function($resource) {
  return $resource("http://localhost:3000/volunteers/sign_in.json");
})

