angular.module('myApp', ['angularSoap'])


.factory("testService", ['$soap',function($soap){
	var base_url = "http://test.alimx.mx/WebService.asmx";
	
	$soap.setCredentials("username","password");

	return {
		GetMarcas: function(){
			return $soap.post(base_url,"GetMarcas");
		}
	}
}])

.controller('MainCtrl', function($scope, testService) {

  testService.GetUsers().then(function(users){
	for(i=0;i<users.length;i++){
		console.log(users[i].firstName);
	}
  });
  
})