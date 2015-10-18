(function () {
	'use strict';
	var controllerId = 'goods';
	angular.module('app').controller(controllerId, ['common', '$http', '$sce', goods]);

	function goods(common, $http, $sce) {
		var getLogFn = common.logger.getLogFn;
		var log = getLogFn(controllerId);

		var vm = this;
		vm.title = 'Goods';
		vm.criteria = { Type: 'Bluerays', Keyword: '' };
		vm.refresh = function () {
			//console.debug(vm.criteria);
			vm.tag = (vm.criteria.Type == 'Bluerays' ? 'br' : 'book');

			var url = common.serviceUrl + vm.tag + (vm.criteria.Keyword == '' ? 'list' : 'search?term=' + vm.criteria.Keyword);
			$http.get(url).success(function (data) {
				//console.debug(data);
				if (vm.tag == 'br__')
					processBlueray(data);
				else
					processBook(data);
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

		function processBook(data) {
			var list = new Array();
			for (var i = 0; i < data.length; i++) {
				list.push({img: common.serviceUrl + vm.tag +'img?id='+data[i].Id, title:data[i].Title});
			}
			vm.data = list;
		}

		function processBlueray(data) {
		}

	}
})();