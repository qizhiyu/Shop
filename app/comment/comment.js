(function () {
    'use strict';
    var controllerId = 'comment';
    angular.module('app').controller(controllerId, ['common', '$http', '$sce', comment]);

    function comment(common, $http, $sce) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Comments';
        activate();

    	//$http.get('http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/htmlcomments').success(function (data) {
        $http.get('/d.html').success(function (data) {
        	vm.comments = $sce.trustAsHtml(data);
        });

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