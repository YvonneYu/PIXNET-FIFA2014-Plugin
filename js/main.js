/**
 * Created by yue on 2014/5/2.
 */

angular.module('App', ['mainService'])
        .controller('authorController', ['$scope', '$http', function($scope, $http) {
                    $http.get('http//emma.pixnet.cc/users/spk?format=json', function(data) {
                            console.log('data', data);
                        $scope.author = {
                                name: 'Naomi',
                                address: '1600 Amphitheatre'
                        };
                });
        }])
        .directive('authorSection', function() {
                function link(scope, element, attrs) {
                        
                }
                
                return {
                        restrict: 'A',
                        //templateUrl: 'my-section.html',
                        link: link
                        
                };
         });
