var app = angular.module('AngularMaps', ['leaflet-directive', 'ngRoute']);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/default-map.html'})
    .when('/kickstarter', { templateUrl: '/partials/kick-map.html'})
    .otherwise({ redirectTo: '/'});
});