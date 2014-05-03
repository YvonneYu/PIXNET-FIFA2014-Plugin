/**
 * Created by yue on 2014/5/2.
 */

angular.module('App', ['mainService'])
//    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
//        $sceDelegateProvider.resourceUrlWhitelist(['self',
//            'http//emma.pixnet.cc/**']);
//
//    }])
//    .config(function ($httpProvider) {
//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//
//    })
    .controller('authorController', ['$scope', 'pixnetService',
        function ($scope, pixnetService) {

            pixnetService.getUserArticles('spk')
            .success(function (data) {
                console.log('data', data);
                $scope.author = {
                    name: 'Naomi',
                    address: '1600 Amphitheatre'
                };
            });
    }])
    .directive('authorSection', function () {
        function link(scope, element, attrs) {
            element.bind('click', function (){
                element.addClass('focusArticle');
                element.parent().addClass('notShow');
            })
        }

        return {
            restrict: 'AE',
            //templateUrl: 'my-section.html',
            link: link
        };
    });
