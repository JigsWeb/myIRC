myIRC.service('Auth',function($http,$rootScope){
  var url = "http://localhost:3000/!/";
  return {
    attempt: function(credentials){
      return $http.post(url+"auth/attempt",credentials);
    },
    logout: function(){
      return;
    }
  }
});
