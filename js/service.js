/**
 * Created by yue on 2014/5/2.
 */


angular.module('mainService', [])
    .constant('SERVICE_URL', {
        'pixnet_host': 'http://emma.pixnet.cc/'
    })
    .service('pixnetService', function (SERVICE_URL, $http) {

        function getData(url, query){
            var queryString =  {format: 'json'};
            query = query ? angular.extend(query, queryString) : queryString;

            return $http({
                method: 'GET',
                url: url,
                params: query
            }).success(function (data, status, headers, config) {
                    return data;
                }).error(errorCallBack);
        }
        function errorCallBack(data, status, headers, config){
            console.log('data: ' + data);
            console.log('status: ' + status);
            console.log("config: " + config);
        }

        function getUserInfo(usrID){
            //http://emma.pixnet.cc/users/:id
            var url = SERVICE_URL.pixnet_host + 'users/'+ usrID;
            return getData(url);
        }

        function getUserArticles(usrID){
            //http://emma.pixnet.cc/blog/articles?user=:id
            var url = SERVICE_URL.pixnet_host + 'blog/articles',
                query = {user: usrID,
                    //football only
                     category_id: 1857718};
            return getData(url, query);
        }

        function getUserHotArticles(usrID){
            //http://emma.pixnet.cc/blog/articles/hot?user=:id
            var url = SERVICE_URL.pixnet_host + 'blog/articles/hot',
                query = {user: usrID, trim_user: 1};
            return getData(url, query);
        }

        function getUserLatestArticles(usrID){
            //http://emma.pixnet.cc/blog/articles/latest?user=:id
            var url = SERVICE_URL.pixnet_host + 'blog/articles/latest',
                query = {user: usrID, trim_user: 1};
            return getData(url, query);

        }

        return {
            getData: getData,
            getUserInfo: getUserInfo,
            getUserArticles: getUserArticles,
            getUserHotArticles: getUserHotArticles,
            getUserLatestArticles: getUserLatestArticles
        }
    })

