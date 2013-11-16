app.controller('KickMapCtrl', function($scope, $http) {

  $scope.defaults = {
    scrollWheelZoom: true
  };

  $scope.center = {
    lat: 37.8,
    lng: -96,
    zoom: 4
  };

  $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
    $scope.selectedState = featureSelected.properties.name;
    stateClick(featureSelected, leafletEvent);
  });

  LoadGeoJson();

  function stateClick (feature, event) {
    LoadGeoJson(feature.properties.name);
  }

  function LoadGeoJson(state) {
    var route = state ? 'api/state/' + state : 'api/states'; 

    $http.get(route).success(function(data){
      $scope.geojson = {
        data: data,
        style: style
      }
    });
  };

  function style(feature) {
    return {
      fillColor: getColor(feature),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    }
  };

  function getColor(feature) {
    if($scope.selectedState == feature.properties.name)
      return 'red';

    var backers = feature.properties.backers;
    return backers > 80 ? '#014636' :
           backers > 70 ? '#016C59' :
           backers > 60 ? '#02818A' :
           backers > 50 ? '#3690C0' :
           backers > 40 ? '#67A9CF' :
           backers > 30 ? '#A6BDDB' :
           backers > 20 ? '#D0D1E6' :
           backers > 10 ? '#ECE2F0' :
                          '#FFF7FB';
  };
});