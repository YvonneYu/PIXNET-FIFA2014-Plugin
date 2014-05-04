/**
 * Created by yue on 2014/5/2.
 */

angular.module('App', ['mainService', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('articles', {
            url: "/articles/:userID",
            templateUrl: "html/articleSection.html",
            controller: 'authorController'
        })
        .state('articlesDetail', {
            url: "/articles/:userID/:articleID",
            templateUrl: "html/articleDetail.html",
            controller: 'articleController'
        })
    })
    .config(function($provide) {
        //http://stackoverflow.com/questions/17494732/how-to-make-a-loading-indicator-for-every-asynchronous-action-using-q-in-an-a
        $provide.decorator('$q', ['$delegate', '$rootScope', function($delegate, $rootScope) {
            var pendingPromisses = 0;
            $rootScope.$watch(
                function() { return pendingPromisses > 0; },
                function(loading) { $rootScope.loading = loading; }
            );
            var $q = $delegate;
            var origDefer = $q.defer;
            $q.defer = function() {
                var defer = origDefer();
                pendingPromisses++;
                defer.promise.finally(function() {
                    pendingPromisses--;
                });
                return defer;
            };
            return $q;
        }]);
    })
    .controller('mainController', function ($scope, allUsersInfo) {
        $scope.showArticles = false;
        allUsersInfo().then(function(usersData) {
            $scope.users = usersData;
        })
    })
    .controller('authorController', function ($scope, $stateParams, pixnetService, $state) {
        var userID = $stateParams.userID || 'spk',
            page = 1;
        //init data
        getUserAllArticles();

        $scope.getHotArticles = function (){
            if (angular.equals('hot', $scope.stage)) {
                return false;
            }
            pixnetService.getUserHotArticles(userID)
                .success(function (data) {
                    $scope.articles = data.articles;
                    $scope.stage = 'hot';
                });
        }

        $scope.goToArticlePage = function(id){
            $state.go('articlesDetail', { userID: userID, articleID: id });
        }

        $scope.getAllArticles = function (){
            if (angular.equals('all', $scope.stage)) {
                return false;
            }
            getUserAllArticles();
        }

        $scope.downloadMore = function (){
            page = page + 1;
            if (angular.equals($scope.stage, 'all')) {
                getUserAllArticles();
            }
        }

        function getUserAllArticles(){
            if(!$scope.articles) {
                $scope.articles = [];
            }
            pixnetService.getUserArticles(userID, page)
                .success(function (data) {
                    $scope.articles = $scope.articles.concat(data.articles);
                    $scope.stage = 'all';
                });
        }
    })
    .controller('articleController', function ($scope, $stateParams, pixnetService, $state){
        var articleID = $stateParams.articleID,
            userID = $stateParams.userID;

        getArticle();

        $scope.back = function (){
            $state.go('articles', { userID: userID });
        }

        function getArticle(){
            pixnetService.getArticle(userID, articleID)
                .success(function (data) {
                    console.log('data', data);
                    $scope.article = data.article;
                });
        }
    })
    .directive('articleHtml', function ($compile){
        function link(scope, element, attrs) {
            scope.$watch('bodyhtml', function(value) {
                if (!value) return;
                // we want to use the scope OUTSIDE of this directive
                // (which itself is an isolate scope).
                var newElem = $compile(value)(scope.$parent);
                element.contents().remove();
                element.append(newElem);
            });
        }
        return {
            restrict: 'AE',
            scope: {
                bodyhtml: '=articleHtml'
            },
            link: link
        };
    })
    .directive('fontPageLink', function ($state){
        function link(scope, element, attrs){
            element.bind('click', function (){
                var authorSection =
                    angular.element(document.querySelector('.focusArticle'));
                console.log('authorSection', authorSection);
                scope.$parent.showArticles = false;
                authorSection.removeClass('focusArticle');
                authorSection.parent().removeClass('notShow');
                if (!scope.$$phase) {
                    //$digest or $apply
                    scope.$apply();
                }
            })
        }

        return {
            restrict: 'AE',
            //templateUrl: 'my-section.html',
            link: link
        };
    })
    .directive('authorSection', function ($timeout, $state) {
        function link(scope, element, attrs) {
            //mouseover

            //fot click behavior
            element.bind('click', function (){
                var id = attrs.id;
                element.addClass('focusArticle');
                element.parent().addClass('notShow');
                $timeout(function(){
                    scope.$parent.showArticles = true;
                    $state.go('articles', { userID: id });
                    if (!scope.$$phase) {
                        //$digest or $apply
                        scope.$apply();
                    }
                },400);
            })
        }
        return {
            restrict: 'AE',
            link: link
        };
    });

