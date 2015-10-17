(function () {
	'use strict';
	var controllerId = 'reg';
	angular.module('app').controller(controllerId, ['common', '$http', reg]);

	function reg(common, $http) {
		var getLogFn = common.logger.getLogFn;
		var log = getLogFn(controllerId);

		var vm = this;
		vm.title = 'Register';
		vm.message = '';
		vm.failed = false;

		vm.activate = function () {
			common.activateController([], controllerId)
                .then(function () { log('Activated Register View'); });
		};

		vm.activate();

		vm.save = function () {
			vm.message = 'Creating...';
			var newUser = vm.newUser;
			$http.post(common.serviceUrl + 'register', newUser).then(function (data) {
				vm.failed = true;
				if (data.status == 200) {
					if (data.data == '"User Registered"') {
						vm.failed = false;
						vm.message = newUser.Name + ' is created successfully.';
						log('Registration success');
					}
					else
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