(function () {
	'use strict';
	var controllerId = 'admin';
	angular.module('app').controller(controllerId, ['common', '$http', admin]);

	function admin(common, $http) {
		var getLogFn = common.logger.getLogFn;
		var log = getLogFn(controllerId);

		var vm = this;
		vm.title = 'Register';
		vm.message = '';

		vm.activate = function () {
			common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
		};

		vm.activate();

		vm.save = function () {
			vm.message = 'Creating...';
			var newUser = vm.newUser;
			$http.post(common.serviceUrl + 'register', newUser).then(function (data) {
				if (data.status == 200) {
					//if (data.data == '"User Registered"') {
					//	vm.message = newUser.Name + ' is created successfully.';
					//}
					//else
						vm.message = data.data;
				}
				else
					vm.message = "problem occured";
			}, function () {
				vm.message = "problem occured";
			});
		};
	}
})();