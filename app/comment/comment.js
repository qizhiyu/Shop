(function () {
	'use strict';
	var controllerId = 'comment';
	angular.module('app').controller(controllerId, ['common', '$http', '$sce', comment]);

	function comment(common, $http, $sce) {
		var getLogFn = common.logger.getLogFn;
		var log = getLogFn(controllerId);

		var vm = this;
		vm.title = 'Comments';
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
			$http.post(common.serviceUrl + 'comment?name=' + item.Name, '"' + item.Content + '"').then(function (data) {
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
                .then(function () { log('Activated comment View'); });
		}

		function getComments() {
			return datacontext.getComments().then(function (data) {
				return vm.comments = data;
			});
		}
	}
})();