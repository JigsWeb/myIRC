myIRC.factory('RequestService', function(Security){
  return {
    request: function(config) {
        if (Security.getToken() !== undefined) {
          config.headers['Authorization'] = Security.getToken();
        }
        return config;
    }
  }
})

myIRC.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('RequestService');
}]);
