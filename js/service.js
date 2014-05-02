/**
 * Created by yue on 2014/5/2.
 */


angular.module('mainService', [])
    .factory('globalService', function ($http){
        "use strict";

        var getMethod = function(url){
            return $http({
                method: 'GET',
                url: url,
                params: ( typeof queryString === 'undefined') ? randNoObject : jQuery.extend(queryString, randNoObject)
                // params: ( typeof queryString === 'undefined') ? '' : queryString
            }).success(function (data, status, headers, config) {
                    return data;
                }).error(errorCallBack);
        }

        var errorCallBack = function (data, status, headers, config){
            console.log('data: ' + data);
            console.log('status: ' + status);
            console.log("config: " + config);
        }

        return {
            getMethod: getMethod
        }
    })
    .factory('pixnetService', function (){

    })

