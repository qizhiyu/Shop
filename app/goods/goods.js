(function () {
	'use strict';
	var controllerId = 'goods';
	angular.module('app').controller(controllerId, ['common', '$http', '$sce', goods]);

	function goods(common, $http, $sce) {
		var getLogFn = common.logger.getLogFn;
		var log = getLogFn(controllerId);

		var vm = this;
		vm.title = 'Goods';
		vm.refresh = function () {
			var url = '/d.html';
			url = common.serviceUrl + 'htmlcomments';
			$http.get(url).success(function (data) {
				vm.comments = $sce.trustAsHtml(data);
			});
		};

		vm.save = function () {
			//log('Posting...');
			var item = vm.newComment;
			$http.post(common.serviceUrl + 'goods?name=' + item.Name, '"' + item.Content + '"').then(function (data) {
				if (data.status == 200) {
					vm.newComment = null;
					log('Post success');
					vm.refresh();
				}
			}, function () {
				log("Post failed");
			});
		};

		activate();
		vm.refresh();

		function activate() {
			common.activateController([], controllerId)
                .then(function () {
                	//log('Activated goods View');
                });
		}

		function getComments() {
			return datacontext.getComments().then(function (data) {
				return vm.comments = data;
			});
		}
	}
})();